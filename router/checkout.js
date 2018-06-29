var express = require('express');
var router = express.Router();
var passport=require("passport");
var Product = require('../model/product.js');
var province = require('../model/address/province.js');
var dictrict = require('../model/address/dictrict.js');
var ward = require('../model/address/ward.js');
var Cart = require('../model/cart.js');
var cartdb = require('../model/cartdb.js');

var csrf=require("csurf");
router.use(csrf());

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        // not ordered
        var cart = new Cart(req.session.spCart ? req.session.spCart : {});
        var cartSession = cart.generateArray();
        var idUser = req.user._id;
        Promise.all([
            cartdb.findOne({idUser : idUser}),
            province.find()
        ])
        .then(([data, province1]) => {
            var cartUser = data.cartUser;
            if(!data.cartUser[0] && !cartSession[0]) {
                console.log('Khong co san pham');
                return res.redirect('/'); 
            }
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
            data.cartUser = result; 
            req.session.spCart = '';
            data.save();
            res.render('shop/signinCheckout', {province : province1, csrfToken : req.csrfToken()}) ;
        }).catch((err) => {
            var newCart = new cartdb();
            
            newCart.idUser =  idUser;
            newCart.cartUser = cartSession; 
            req.session.spCart = ''; 
            newCart.save(); 
            province.find(function(err, cb){
                res.render('shop/signinCheckout', {province : cb, csrfToken : req.csrfToken()});
            })
        });
        }else {
        res.render('shop/signinCheckout', { errEmail : req.flash('err-email'), valEmail:req.flash('valEmail'), csrfToken : req.csrfToken()})
    }
});


router.post('/', passport.authenticate('local-signin', {failureRedirect:'/checkout', successRedirect:'/checkout'}));


module.exports = router;












