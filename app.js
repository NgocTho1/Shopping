


var express = require("express");
var app = express();

var path = require("path")
var jwt = require("jsonwebtoken")
var bodyParser = require("body-parser")
var passport = require("passport");
var cookieParser = require("cookie-parser") 
var validator = require("express-validator")
var flash = require("connect-flash")
var mongoose = require("mongoose")
var session = require("express-session");
var expresshbs = require("express-handlebars");
var helmet = require('helmet');

var cartdb = require('./model/cartdb.js');
app.listen(4100, function() { 
  console.log('sussess')
}); 
// exports router
var user = require("./router/user.js") 
var index = require("./router/index.js");
var admin = require('./router/admin.js');
var cate = require('./router/cate.js');
var product = require('./router/product');
var cart = require('./router/cart.js');
var checkout = require('./router/checkout');
// connect address
//var province = require('./seed/address/province');
//var province = require('./seed/address/dictrict');
//var province = require('./seed/address/ward');

app.set("view engine","ejs");

// connect mongoose
//var Product=require('./seed/product-seeder.js');
//var cate = require('./seed/cate-seed.js');
//var supperAdmin = require('./seed/admin.js');
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/passpost-local"); 

// default value mongoose




app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
//app.set('trust proxy', 1)
app.use(session({secret:"ngoctho1A",name : 'ga', cookie: { maxAge: 1000*60*10, httpOnly : false }}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())
app.use(validator());
// app.use(validator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));
app.use(cookieParser());
app.use(helmet());
//app.use(helmet.xssFilter());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/user',express.static(path.join(__dirname,'public')));

require("./config/passport.js")(passport); // pass passport for configuration

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  if(req.isAuthenticated()) {
    res.locals.userLocal = req.user.local.name;
    res.locals.userFb = req.user.facebook.name;
  
  }

  
  res.locals.session = req.session;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.errorLocal = req.flash('errorLocal');
  
  next();
});

app.use('/', index);
app.use('/user', user);
app.use('/admin', admin);
app.use('/admin/cate', cate);
app.use('/admin/product', product);
app.use('/admin/cart', cart);
app.use('/checkout', checkout);








app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });  



  
module.exports = app;





