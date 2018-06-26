var express=require('express');
var router=express.Router();
var passport=require("passport");
var cartdb = require('../model/checkout.js');
var cate = require('../model/cate.js');
var Product = require('../model/product.js');


var csrf=require("csurf");
router.use(csrf());

   

// normal routes =======================================
    
    router.get("/profile",isLoggedIn,function(req,res){
        //console.log(req.user);
        res.render("./user/profile",{userLocal : req.user.local.email, userFb : req.user.facebook.name, csrfToken : req.csrfToken()});

    });
    // logout
    router.get('/logout', isLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/')
    });
    router.get('/order', isLoggedIn, (req, res) => {
        var idUser = req.user._id;
        cartdb.find({idUser : idUser})
            .then(data => {
                res.render('user/order', {order : data});
            })
        
    });
    
    router.use('/',notLoggedIn,function(req,res,next){
        
        next();
    });
    

    
    

    // Test passport
    router.get('/private',isLoggedIn,function(req, res){
        res.send('Chi login roi moi vao duoc')
    });

     

    // locally

        // LOGIN ============================
        router.get('/login',function(req, res){
            var queryRedirect = req.query.redirect;
            res.render("./user/signin",{errEmail : req.flash('err-email'), valEmail:req.flash('valEmail'), csrfToken:req.csrfToken(), queryRedirect : queryRedirect});
        })
        // process the login form
        // router.post('/login', (req, res) => {
        //     passport.authenticate('local-signin', {successRedirect : '/'})

        // });
        router.post('/login', function(req, res, next) {
            var queryRedirect = req.body.queryRedirect;
            passport.authenticate('local-signin', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) {
                    if(queryRedirect) {
                        return res.redirect(`/user/login?redirect=${queryRedirect}`);
                    }
                    return res.redirect('/user/login');
                }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.redirect(`${queryRedirect}` );
                });
            })(req, res, next);
          });
        
        
        router.post('/logincomment', passport.authenticate('local-signin', {failureRedirect : ''}), (req, res) => {
            if(req.user._id) {
                var cateUrl = req.body.cate;
                var id = req.body.idPro;
                var name = req.body.tittle; 
                res.redirect(`/${cateUrl}/${name}.${id}`)
                console.log(`/${cateUrl}/${name}.${id}`);
                // var nonBlock = (async function() {
                //     try {
                //         const cateId = await cate.findOne({ url : cateUrl});
                //         const relatedPro = await Product.find({ cateId : cateId._id, _id : {$ne : id}});
                        
                //         const pro = await Product.findOne( {_id: id, tittleLink : name, cateId : cateId._id });
                //         //console.log(pro);
                        
                //     }catch(err) {
                //         res.render('error', {message : 'Không tìm thấy'});
                //     }
                // })()
            }
            
        });      
        // successRedirect
        
         
        // SIGNUP ===========================
        router.get('/signup',(req, res)=>{
            
            res.render('./user/signup',{message:req.flash('signup'),csrfToken:req.csrfToken()})
        });
        // process the signup form
        router.post('/signup',passport.authenticate('local-signup',{failureRedirect:'/user/signup',successRedirect:'/user/profile'}))
        // successRedirect
        

    // facebook =========================

        router.get('/auth/facebook',passport.authenticate('facebook',['public_profile', 'email']));

        router.get('/auth/facebook/callback',passport.authenticate('facebook',{
            successRedirect:'/user/profile',
            failureRedirect:'/user/login'
        }))
        router.get('/facebook',function(req,res){
            res.send('xin chao')
        })
        
        
module.exports=router;



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
        }
        res.redirect("/");
    };
function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
        }
        res.redirect("/");
    };
    
    
