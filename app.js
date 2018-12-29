var app = require('express')();
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var routes = require('./routes');

mongoose.connect(process.env.MONGODB_URI || "mongodb://robert:askme123@ds233571.mlab.com:33571/heroku_rhn16zjb",
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
app.get('/', function(req, res) {
    res.render('index');
})
// app.use(routes);

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
