
module.exports={
    'facebookAuth':{
        'clientID':'1465255030237699', // Your App ID
        'clientSecret':'72a0320918955cef827553c28d43528a', // Your App secret
        'callbackURL':'http://localhost:4500/user/auth/facebook/callback',
        //'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields':['id','email','displayName']

    }
}