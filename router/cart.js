var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cart = require('../model/checkout');
var product = require('../model/product');

router.get('/danh-sach', (req, res) => {
    cart.find((err, data) => {
        res.render('./admin/cart/danh-sach', { cart: data });
        var i, j,
            dataLength = data.length
        for (i = 0; i < dataLength; i++) {
            var a = 0;
            var num = data[i].cart.length;
            for (j = 0; j < num; j++) {
                a += data[i].cart[j].qty;
            }
            //console.log(a);
        }
    });
});

router.get('/danh-sach/:id', (req, res) => {
    cart.findOne({ _id: req.params.id }, (err, data) => {
        res.render('./admin/cart/chi-tiet', { cart: data });
    })

});

router.get('/xoa-cart/:id', (req, res) => {
    cart.findByIdAndRemove(req.params.id, function (err, data) {
        if (err) throw err;
        if (data) {
            req.flash('success_msg', 'Xóa thành công');
            res.redirect('/admin/cart/danh-sach');
        }
    })
});

router.get('/thanh-toan/:id', (req, res) => {
    cart.findById(req.params.id, (err, data) => {
        if (err) throw err;
        if (data) {
            data.status = 2;
            data.save();
            res.redirect('/admin/cart/danh-sach');
        }
    })
});

router.get('/giao-hang/:id', (req, res) => {
    cart.findById(req.params.id, (err, data) => {
        if (err) {
            throw err;
        } else {
            data.cart.forEach(qtyCart => {
                product.findById(qtyCart.item._id, (err, qtyPro) => {
                    //console.log(qtyPro);
                    var qtyUpdate = qtyPro.qty - qtyCart.qty;
                    if (qtyUpdate < 0) {
                        qtyUpdate = 0;
                    }
                    qtyPro.qty = qtyUpdate;
                    qtyPro.save();

                })
            })
            data.status = 1;
            data.save();
            res.redirect('/admin/cart/danh-sach');
        }

        // updata qty product        
    })
});


module.exports = router;