var app = require('express')();
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var routes = require('./routes');

mongoose.connect(process.env.MONGODB_URI || "mongodb://robert911:@skmE0904@ds145184.mlab.com:45184/heroku_m50hmbxj",
 {
   useMongoClient: true
 });

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser());
app.use(session({
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(routes);

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
