var express =require('express');
var router = express.Router();
var passport = require('passport');
var cate = require('../model/cate.js');


router.get('/profile' , function(req, res) {
    cate.find((err, cate) => {
        res.render('./admin/dashboard/danh-sach', {cate : cate});
    })
    
})

router.use(function(req, res ,next) {
    if(req.isAuthenticated() && req.user.local.roles == 'user'){
        res.redirect('/')
    }
    next()
})

router.get('/login', function(req, res) {
    res.render('./admin/login');
});
router.post('/login', passport.authenticate('local-signin', { falureRedirect : '/admin/login', successRedirect : '/admin/profile'}))

module.exports = router;

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.local.roles == 'supperAdmin'){
        return next()
    };
    res.redirect('/');
}
