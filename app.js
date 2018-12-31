var app = require('express')();
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var setUpPassport = require('./setuppassport');
var routes = require('./routes');

// mongoose.connect(process.env.MONGODB_URI || "mongodb://user:askme123@ds127436.mlab.com:27436/heroku_jgsm1d55",
//  {
//    useMongoClient: true
//  });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/testdb",
 {
   useNewUrlParser: true
 });

setUpPassport();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
