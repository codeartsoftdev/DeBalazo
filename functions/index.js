const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require("firebase");
const path = require('path');
const exphbs = require('express-handlebars');
const methosOverride= require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');



//Inicializadores
const app = express();
admin.initializeApp(functions.config().firebase);
require('./config/passport');
// var db = admin.firestore();

//Setting
app.set('views', path.join(__dirname, 'views'));  //Manejar el directorio _dir devuelve la direccion actual
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //Layout que aparecera en todas las paginas
    layoutsDir: path.join(app.get('views'), 'layouts'), //direcciona del layout
    partialsDir: path.join(app.get('views'), 'partials'), //direccion de Vistas parciales
    extname: '.hbs' //Extension
}));
app.set('view engine', '.hbs') //Configuracion final de la vista

var config = {
    apiKey: "AIzaSyBptaEvoSSM9AlVCN0CYSD4j1ZaVMHqgw4",
    authDomain: "debalazo-maqueta.firebaseapp.com",
    databaseURL: "https://debalazo-maqueta.firebaseio.com",
    projectId: "debalazo-maqueta",
    storageBucket: "debalazo-maqueta.appspot.com",
    messagingSenderId: "269078144715"
  };
firebase.initializeApp(config);


//Middlewares
app.use(express.urlencoded({extended:false}));   //Entender los datos que envia el usuario desde los controles
app.use(methosOverride('_method')) //Formularios puedan enviar diferentes metodos como put o delete
app.use(session({   //autenticar un usuario y mantenerlo en la sesion
    secret: 'mysecretapp',
    resave:true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Variables Globales
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/menu'));
app.use(require('./routes/datos'));


//Archivos estaticos
app.use(express.static(path.join(__dirname, '../public')));

//Servidor escuchando
exports.app = functions.https.onRequest(app);