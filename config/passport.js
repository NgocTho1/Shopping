
var LocalStrategy=require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy
var User=require("../model/user.js");
var auth=require('./auth')


module.exports=function(passport){
    
    // used to serialize the user for the session
    passport.serializeUser(function(user,done){
        done(null,user.id)
        //console.log(user.local.username);
    })
    
    //used to deserialize the user
    passport.deserializeUser(function(id,done){
        User.findById(id ,function(err,user1){
            done(err,user1);
            //console.log(user1);
        })
    });

    // =================================================
    // LOCAL LOGIN =====================================
    // =================================================
    passport.use("local-signin",new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback:true
    },function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({"local.email" : email},function(err,user){
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false, req.flash('err-email','Email hoặc mật khẩu không hợp lệ'),req.flash('valEmail', email))
                }
                if(!user.validPassword(password)){
                    return done(null, false, req.flash('err-email','Email hoặc mật khẩu không hợp lệ'),req.flash('valEmail', email));
                }
                // all is well, return user
                else{
                    return done(null,user)
                }
            })
        })
    }));

    // passport.use("admin",new LocalStrategy({
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback:true
    // },function(req, email, password, done){
    //     process.nextTick(function(){
    //         admin.findOne({ email : email},function(err, admin){
    //             if(err){
    //                 return done(err);
    //             }
    //             if(!admin){
    //                 return done(null,false,req.flash('err-email','Email không hợp lệ'),req.flash('valEmail',username));
    //             }
    //             if(!admin.validPassword(password)){
    //                 return done(null,false);
    //             }
    //             // all is well, return user
    //             else{
    //                 return done(null,admin)
    //             }
    //         })
    //     })
    // }))

    // =================================================
    // LOCAL SIGNUP =====================================
    // =================================================
    passport.use('local-signup',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },function(req, email, password,done){
        
        User.findOne({'local.email' : email},function(err,user){
            if(err){
                return done(err);
            };
           
            if(user){
                return done(null,false,req.flash("signup","Tên đăng nhập đã tồn tại"))
            }
            var newUser=new User();
            newUser.local.email = email;
            newUser.local.name  = req.body.name;
            newUser.local.password = newUser.encryptPassword(password);
           
            
            newUser.save(function(err,result){
                if(err){
                    return done(err);
                }else{
                    return done(null,newUser)
                }

            })
            
        })
    }));

    // =================================================
    // Facebook =====================================
    // =================================================
    
    var authFacebook=auth.facebookAuth
    passport.use(new FacebookStrategy({
        clientID: auth.facebookAuth.clientID,
        clientSecret: auth.facebookAuth.clientSecret,
        callbackURL: auth.facebookAuth.callbackURL,
        profileFields:auth.facebookAuth.profileFields,
        passReqToCallback:true
    },function(req,accessToken,refreshToken,profile,done){
        //console.log(profile)
        //console.log(accessToken)
        //console.log(profile.emails.value)
        
        User.findOne({'facebook.id':profile.id},function(err,user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null,user)
            }else{
                var newUser=new User();
                newUser.facebook.id=profile.id;
                //newUser.facebook.token=accessToken;

                newUser.facebook.name=profile.displayName;
                newUser.facebook.email=profile.email || '';
                newUser.save(function(err,result){
                    if(err){
                        return done(err);
                    }else{
                        return done(null,newUser)
                    }
                })
            }
       })
    
        
    }
    ))
    
    
    /*
   var fbStrategy = auth.facebookAuth;
   fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
   passport.use(new FacebookStrategy(fbStrategy,
   function(req, token, refreshToken, profile, done) {

       // asynchronous
       process.nextTick(function() {

           // check if the user is already logged in
           if (!req.user) {

               User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                   if (err)
                       return done(err);

                   if (user) {

                       // if there is a user id already but no token (user was linked at one point and then removed)
                       if (!user.facebook.token) {
                           user.facebook.token = token;
                           user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                           //user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                           user.save(function(err) {
                               if (err)
                                   return done(err);
                                   
                               return done(null, user);
                           });
                       }

                       return done(null, user); // user found, return that user
                   } else {
                       // if there is no user, create them
                       var newUser            = new User();

                       newUser.facebook.id    = profile.id;
                       newUser.facebook.token = token;
                       newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                       //newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                       newUser.save(function(err) {
                           if (err)
                               return done(err);
                               
                           return done(null, newUser);
                       });
                   }
               });

           } else {
               // user already exists and is logged in, we have to link accounts
               var user            = req.user; // pull the user out of the session

               user.facebook.id    = profile.id;
               user.facebook.token = token;
               user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
               //user.facebook.email = (profile.emails[0].value || '').toLowerCase();

               user.save(function(err) {
                   if (err)
                       return done(err);
                       
                   return done(null, user);
               });

           }
       });

   }));
    */

                
            

            
        

    

    
}