var express =require('express');
var router = express.Router();
var product = require('../model/product');
var multer = require('multer');
var cate = require('../model/cate');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
var upload = multer({storage : storage});

function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

router.get('/danh-sach',(req,res)=>{
    cate.find((err, cateData) => {
        product.find((err, data) => {
            if(err) throw err; 
            res.render('admin/product/danh-sach', { pro : data, cate : cateData });
        })
    });
    
});
router.get('/them-product',(req,res)=>{
    var errPrice = '';
    cate.find(function(err, data) {
        res.render('admin/product/them', {errPrice : errPrice, errors : null, cate : data});
    })
});

router.post('/them-product', upload.any('file'), (req,res)=>{
    var reqBody = req.body;
    var saleOff = parseInt(req.body.saleOff);
    var price = parseInt(req.body.price);
    var errPrice = '';

    req.checkBody('name', 'Tên không được trống nhỏ nhất là 5 ký tự').isLength({min : 5, max : 100});
    req.checkBody('price', 'Giá phải là số').isInt({ gt : 0});
    // If insert => check
    if(saleOff){
        req.checkBody('saleOff', 'Sale Off phải là số và lớn hơn 0').isInt({ gt : 0});
    }

    req.checkBody('description', 'Mô tả nhỏ nhất là 5 ký tự').isLength({min : 5});
    var errors = req.validationErrors();
    if(errors){
        cate.find(function(err, data) {
            res.render('admin/product/them', {cate : data, errors : errors, errPrice : errPrice})
        })
    }else if(saleOff > price) {
        errPrice = 'Giá sale off không được lớn hơn giá bán'
        cate.find(function(err, data) {
            res.render('admin/product/them', {cate : data, errors : null, errPrice : errPrice})
        })
    }else{
        var fileName = [];
        // Maybe is 1, 2, 3 images
        req.files.forEach(function(file) {
            fileName.push('upload/' + file.filename);
        })
        var newPro = new product();
        newPro.tittle = req.body.name;
        newPro.tittleLink = bodauTiengViet(req.body.name);
        newPro.cateId = req.body.cateId;
        newPro.imagePath = fileName;
        newPro.price = price;
        newPro.qty = req.body.quality;
        if(saleOff){
            newPro.saleOff = saleOff;
        }
        newPro.description = req.body.description;
        newPro.save();
        req.flash('success_msg', 'Đã thêm Thành Công');
        
        res.redirect('/admin/product/them-product');
    }
});


router.get('/sua-product/:id',(req,res)=>{
    product.findById( req.params.id , function(err, pro) {
        var errPrice = '';
        if(err) {
            // Use res.locals in file app.js
            req.flash('errorLocal', 'Không tìm thấy Id xin thử lại');
            res.redirect('/admin/product/danh-sach'); 
        }else{
            cate.find(function(err, cate) {
                res.render('admin/product/sua', {errPrice : errPrice, errors: null ,pro : pro, cate : cate});
            })
        }
    })
});
router.post('/sua-product/:id', upload.any('file') ,(req,res)=>{
        var id = req.params.id;
        var saleOff = parseInt(req.body.saleOff);
        var price = parseInt(req.body.price);
        var errPrice = '';
        
        req.checkBody('name', 'Tên không được trống nhỏ nhất là 5 ký tự').isLength({min : 5, max : 100});
        req.checkBody('price', 'Giá phải là số').isInt({ gt : 0});
        // If insert => check
        if(saleOff){
            req.checkBody('saleOff', 'Sale Off phải là số và lớn hơn 0').isInt({ gt : 0});
        }
        req.checkBody('description', 'Mô tả nhỏ nhất là 5 ký tự').isLength({min : 5});
         
        var errors = req.validationErrors();
        if(errors){
            product.findById( id , function(err, pro) {
                cate.find(function(err, cate) {
                    res.render('admin/product/sua', {pro : pro, cate : cate, errors : errors, errPrice : errPrice});
                    //console.log(errors);
                })
            })
        }else if(saleOff > req.body.price) {
            errPrice = 'Giá sale off không được lớn hơn giá bán';
            product.findById( id , function(err, pro) {
                cate.find(function(err, cate) {
                    res.render('admin/product/sua', {pro : pro, cate : cate, errors : null, errPrice : errPrice});
                    //console.log(errors);
                })
            })
            
        }else{
            product.findById( id, function(err, pro) {
                
                var fileName = []
                // Maybe is 1, 2, 3 images
                req.files.forEach(function(file){
                    fileName.push('./upload/' + file.filename);
                })
                // update
                pro.tittle = req.body.name;
                pro.tittleLink = bodauTiengViet(req.body.name);
                pro.imagePath = fileName;
                pro.price = price;
                if(saleOff){
                    pro.saleOff = saleOff;
                }else {
                    pro.saleOff = undefined;
                }
                pro.qty = req.body.quality;
                pro.cateId = req.body.cateId;
                pro.description = req.body.description;
                
                pro.save(function(err) {
                    if(err) throw err;
                }); 
				req.flash('success_msg', 'Đã Sửa Thành Công');
                res.redirect( req.params.id);  
                
            })
        }
    
});

router.get('/xoa-product/:id',(req,res)=>{
    product.findByIdAndRemove(req.params.id, function(err, data) {
        if(err) throw err;
        if(data){
            req.flash('success_msg', 'Đã xóa thành công');
            res.redirect('/admin/product/danh-sach')
        } 
    })
});

module.exports = router;