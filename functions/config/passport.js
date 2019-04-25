const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const firebase = require('firebase');

passport.use(new localStrategy({
    usernameField: 'email'
}, (email, password, done ) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(User){
       const user = User.user;
        return done(null, user);
    }).catch(function(){
        return done(null, false, {error: 'Usuario o contraseña incorrecta'});
    });
}));


passport.serializeUser((user, done) =>{
    done(null, user.uid);
});
