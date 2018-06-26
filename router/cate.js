var express =require('express');
var router = express.Router();

var cate = require('../model/cate.js');


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


router.get('/danh-sach' , function(req, res) {
    cate.find((err, cate) => {
        res.render('./admin/cate/danh-sach', {cate : cate});
    })
    
});

router.get('/them-cate',(req,res)=>{
    res.render('./admin/cate/them', {errors : null});
});

router.post('/them-cate',(req,res)=>{
    req.checkBody('name', 'Tên không được trống nhỏ nhất là 5 ký tự').isLength({min : 5, max : 100});
    var errors = req.validationErrors();
    if(errors){
        res.render('./admin/cate/them', {errors : errors});        
    }else{
        var newCate = new cate();
        newCate.name = req.body.name;
        newCate.url = bodauTiengViet(req.body.name);
        newCate.save();
        req.flash('success_msg', 'Thêm thành công' );
        res.redirect('/admin/cate/them-cate')
    }    
});

router.post('/sua-cate/:id',(req, res)=> {
    cate.findById(req.params.id , (err, data) => {;
        if(err) throw err;
        data.name = req.body.name;
        data.url = bodauTiengViet(req.body.name);
        data.save();
        req.flash('success_msg', 'Sửa thành công' );
        res.redirect(req.params.id);
    });
});

router.get('/sua-cate/:id', function(req, res) {
    cate.findById( req.params.id, function(err, data) {
        if(err) throw err;
        res.render('admin/cate/sua.ejs', {cate : data});
    })
})

router.get('/xoa-cate/:id',(req,res)=>{
    cate.findByIdAndRemove(req.params.id, function(err, data) {
        if(err) throw err;
        if(data) {
            req.flash('success_msg', 'Xóa thành công');
            res.redirect('/admin/cate/danh-sach');
        }
    })
});


module.exports = router;