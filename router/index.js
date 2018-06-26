

var express = require('express');
var router = express.Router();
var Cart = require('../model/cart.js');
var cate = require('../model/cate.js');
var Product = require('../model/product.js');
var province = require('../model/address/province.js');
var dictrict = require('../model/address/dictrict.js');
var ward = require('../model/address/ward.js');
var checkout = require('../model/checkout.js');
var cartdb = require('../model/cartdb.js');

var csrf=require("csurf");
router.use(csrf());

function totalQty(req){
    var qty = 0;
    
    if(req.isAuthenticated()) {
        var idUser = req.user._id;
        cartdb.findOne({ idUser : idUser})
            .then( data => {
               
                data.cartUser.forEach( elm => {
                    qty += elm.qty;
                })
                
                return req.session.totalQty = qty;

            })
            .catch(err => console.log(err)) 

        //return qty
    }else {
        var cart=new Cart(req.session.spCart ? req.session.spCart : {});
        cart.generateArray().forEach(function(elm) {
            qty += elm.qty; 
        })
        //console.log('vao day');
        return req.session.totalQty = qty;
    }

    
}



// Use totalQty all page
router.use('/', function(req, res, next) {
    totalQty(req) 
    
    next();  
})


router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        var cart = new Cart(req.session.spCart ? req.session.spCart : {});
        var cartSession = cart.generateArray();
        var idUser = req.user._id; 
        Promise.all([
            cate.find(),
            Product.find(),
            cartdb.findOne({idUser : idUser}) 
        ])
        .then(([dataCate, pro, cart]) => {
            var cartUser = cart.cartUser;
               
            if(cartSession[0] && cartUser[0]) {
                for(i = 0; i< cartUser.length; i++) {
                    for(j = 0; j< cartSession.length; j++) {
                        if(cartUser[i].item._id == cartSession[j].item._id) {
                            cartSession[j].qty += cartUser[i].qty;
                            // Update saleOff
                            if(cartSession[j].item.saleOff) {
                                cartSession[j].price += cartUser[i].qty * cartSession[j].item.saleOff;
                            }else {
                                cartSession[j].price += cartUser[i].qty * cartSession[j].item.price;
                            }
                            console.log('khong co chay vong lap nay');
                            cartUser.splice(i, 1);
                        }
                    } 
                }
            }
            
            var result = cartSession.concat(cartUser);
            cart.cartUser = result; 
            req.session.spCart = '';
            cart.save();
            console.log('ve trang chu');
            
            return res.render('./user/index', { product: pro, cate : dataCate})
        })
        .catch(err => { 
            var newCart = new cartdb();
            console.log(err);
            newCart.idUser =  idUser;
            newCart.cartUser = cartSession;
            req.session.spCart = ''; 
            newCart.save(); 
            cate.find((err, dataCate) => {
                Product.find((err, pro) => {
                    
                    res.render('./user/index', { product: pro, cate : dataCate})
                });
            });
            
        })
            
        
    }else {
        cate.find((err, dataCate) => {
            Product.find((err, pro) => {
                
                res.render('./user/index', { product: pro, cate : dataCate})
            });
        });
    }
    
    
});

router.get('/add-cart/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.spCart ? req.session.spCart : {});

    if(req.isAuthenticated()) {
        var idUser = req.user._id;

        Promise.all([
            Product.findById(productId),
            cartdb.findOne({idUser : idUser}) 
        ])
        .then(([product, cart1]) => {
            var cart = new Cart(req.session.spCart ? req.session.spCart : {});
            var cartUser = cart1.cartUser;
            cart.add(product, product._id);
            req.session.spCart = cart;
            var cartSession = cart.generateArray();
            
            if(cartSession[0] && cartUser[0]) {
                for(i = 0; i< cartUser.length; i++) {
                    for(j = 0; j< cartSession.length; j++) {
                        if(cartUser[i].item._id == cartSession[j].item._id) {
                            cartSession[j].qty += cartUser[i].qty;
                            // Update saleOff
                            if(cartSession[j].item.saleOff) {
                                cartSession[j].price += cartUser[i].qty * cartSession[j].item.saleOff;
                            }else {
                                cartSession[j].price += cartUser[i].qty * cartSession[j].item.price;
                            }
                            
                            cartUser.splice(i, 1);
                        }
                       
                    } 
                }
            }
            
            var result = cartSession.concat(cartUser);
            cart1.cartUser = result; 
            req.session.spCart = '';
            cart1.save();
            res.redirect('/');
            console.log('add-cart chay');
        })
        .catch(err => console.log(err))
    }else {
        Product.findById(productId)
            .then(product => {
                cart.add(product, product._id);
                req.session.spCart = cart;
                res.redirect('/')
            })
            .catch( err => res.redirect('/'))
    }
})

router.get('/xoa-cart/:id',function(req,res){
    var params = req.params.id;
    if(req.isAuthenticated()) {
        var Uid = req.user._id;
        cartdb.findOne({idUser : Uid })
            .then( data => {
                var result = data.cartUser
                result.forEach( (e, index) => {
                    if( e.item._id == params) {
                        result.splice(index, 1);

                    } 
                });
                // When nothing product in cart
                if(!result[0]) {
                    cartdb.findOneAndUpdate({idUser : Uid }, { $set: {cartUser : []}}, err => {
                        if(err) console.log(err);
                    })
                    return res.redirect('/shopping-cart');
                }
                data.cartUser = [];
                data.cartUser = result;
                //console.log(result);
                data.save();
                return res.redirect('/shopping-cart');
                
            })
            .catch(err => console.log(err))
    }else {
        var cart = new Cart(req.session.spCart ? req.session.spCart : {});
        cart.remove(params);
        req.session.spCart = cart;
        if(req.session.spCart ||  req.session.spCart.totalQty > 0){
            res.redirect('/shopping-cart');
        }
    }
    
});

router.post('/update-cart/:id',function(req,res){
    var id1 = req.params.id;
    var soluong = parseInt(req.body.soluong); 

    if(req.isAuthenticated()) {
        var Uid = req.user._id;
        Promise.all([
            cartdb.findOne( { idUser : Uid }),
            Product.findById(id1)
        ])
        .then(([data, product]) => {
            var cartUpdate = data.cartUser;
            for( i = 0; i < cartUpdate.length; i++) { 
                if( cartUpdate[i].item._id == id1) {
                    cartUpdate[i].qty = soluong;
                    // updated at current prices
                    if(product.saleOff) {
                        cartUpdate[i].price = cartUpdate[i].qty * product.saleOff;
                    }else {
                        cartUpdate[i].price = cartUpdate[i].qty * product.price;
                    }
                    
                }    
            }
            var result = cartUpdate;
            data.cartUser = [];
            data.cartUser = result;
            data.save();
            console.log('/update-cart/:id');
            return res.redirect('/shopping-cart');  
        })
        .catch( err => console.log(err))
        
    }else {
        var cart = new Cart(req.session.spCart ? req.session.spCart : {});
        cart.update(id1, soluong);
        console.log('aaa');
        req.session.spCart = cart;
        res.redirect('/shopping-cart');   
    }
    
});

router.get('/:cate/all', function(req, res) {
    var cateUrl = req.params.cate;
    
    if(req.query.page){
        var page = Math.ceil(req.query.page);
        
        var pageList = (async function() {
            try {
                var cateId = await cate.findOne({url : cateUrl});
                var [pro, proLimit] = await Promise.all([
                    Product.find({cateId : cateId._id}),
                    Product.find({cateId : cateId._id}).skip( (page * 3) - 3 ).limit(3)
                ])
                var lengthPage = Math.ceil( pro.length / 7);
                // user send page small lengthPage ?page=100000
                if(!proLimit[0]) {
                    res.status(404).render('error', {message : 'Trang bạn tìm kiếm không tồn tại'})
                }else {
                    res.render('./shop/cate', {pro : proLimit, cate : cateId, lengthPage : lengthPage, nextPage : page })
                }
            }catch(err) {
                res.status(404).render('error', {message : 'Trang bạn tìm kiếm không tồn tại'})
            }
            
        })()
    }else {
        var dataCate = '';
        cate.findOne({url : cateUrl})
            .then(data => { dataCate = data; return Product.find({ cateId : data._id}) } )
            .then(pro => { 
                var lengthPage = Math.ceil( pro.length / 7);
                pro.length = 7; 
                res.render('./shop/cate', {pro : pro, cate : dataCate, lengthPage : lengthPage, nextPage : 1 })
             })
            .catch( err => res.status(404).render('error', {message : 'Trang bạn tìm kiếm không tồn tại'}))    
    }
    
})


router.get('/:cate/:name.:id',function(req, res) {  
    var cateUrl = req.params.cate;
    var id = req.params.id;
    var name = req.params.name; 
    // function cateId(cate) {
    //     return Product.find({ cateId : cate._id, _id : {$ne : id}})
    // }
    var nonBlock = (async function() {
        try {
            const cateId = await cate.findOne({ url : cateUrl});
            const relatedPro = await Product.find({ cateId : cateId._id, _id : {$ne : id}});
            const pro = await Product.findOne( {_id: id, tittleLink : name, cateId : cateId._id });
            res.render('./shop/chi-tiet', {product : pro, cate : cateId, relatedPro : relatedPro,  csrfToken : req.csrfToken()});
        }catch(err) {
            res.render('error', {message : 'Không tìm thấy'});
        }
    })()
    
})

router.get('/shopping-cart', function(req, res) {
    var cart = new Cart(req.session.spCart ? req.session.spCart : {});
    var cartSession = cart.generateArray();

    if(req.isAuthenticated()) {
        var idUser = req.user._id; 
        cartdb.findOne({idUser : idUser}) 
            .then(data => {
                
               console.log('vao day');
                return res.render('./shop/shopping-cart', {product: data.cartUser}) ;
            })
            .catch(err => { 
                // var newCart = new cartdb();
                console.log(err);
                // newCart.idUser =  idUser;
                // newCart.cartUser = cartSession;
                // req.session.spCart = ''; 
                // newCart.save(); 
                // res.render('./shop/shopping-cart', {product: newCart.cartUser});
                
            })
    }else if(!req.session.spCart || req.session.spCart.totalQty == 0 ) {
        res.render('./shop/shopping-cart', {product : null})
    }else{
        res.render('./shop/shopping-cart', {product: cart.generateArray()} );
    }
});


router.post('/dat-hang', function(req, res) {
    //var cart = new Cart(req.session.spCart ? req.session.spCart : {});
    //var data = cart.generateArray();
    var idUser = req.user._id;
    
    cartdb.findOne({idUser : idUser})
        .then(data => {
            var date1 = new Date();
           
            var checkout1 = new checkout({
                name        : req.body.name,
                idUser      : idUser,
                sdt         : req.body.sdt,
                date        : `${date1.getHours()}:${date1.getMinutes()} ${date1.getDate()}/${date1.getMonth() + 1}/${date1.getFullYear()}`,
                province    : req.body.valPro,
                dictrict    : req.body.valDic,
                ward        : req.body.valWard,
                msg         : req.body.message,
                cart        : data.cartUser
            })
            
            checkout1.save(function(err){
                if(err) return handerError(err);
            })
            data.cartUser = [];
            data.save();
            res.redirect('/')
            
        }) 
    
    
})
router.post('/dictrict', (req, res) => {
    var province = req.body.value1;
    dictrict.find({idProvince : province}, function(err , cb) {
        res.send(cb);
        
    })
    
});
router.post('/ward', (req, res) => {
    var dictrict = req.body.value2;
    ward.find({ idDictrict : dictrict}, (err, cb) => {
        res.send(cb);
       
    })
});

router.post('/search',(req,res)=>{
    
    cate.find(function(err, dataCate) {
        Product.find({  $text: { $search: req.body.search}}, function(err, data) {
            var result = []
            dataCate.forEach(function(cate) {
                
                data.forEach(function(e) {
                    if(cate._id == e.cateId){
                        result.push(`<p><a href='/${cate.url}/${e.tittleLink}.${ e._id }'> ${e.tittle} </a></p>`);
                    }
                })
            })
            res.send(result); 
        })
    }) 
    
});


module.exports = router

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render("/");
}
