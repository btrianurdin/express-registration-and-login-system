var express = require('express');

var router = express.Router();

var User = require('./models/user');

var router = express.Router();

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.info = req.flash('info');
    next();
});

router.get('/', function(req, res, next) {
    User.find()
        .sort({ createdAt: 'descending' })
        .exec(function(err, users) {
            if(err) {
                return next(err);
            }
            res.render('index', { 
                users: users
            });
        });
});

router.get('/signup', function(req, res) {
    res.render('signup');
})

router.post('/signup', function(req, res, next) {
    var username = req.body.user;
    var password = req.body.pass;

    User.findOne({ username: username }, function(err, user) {
        if(err) {
            return next(err);
        }
        if(user) {
            req.flash('error', 'User already exists');
            return res.redirect('/signup');
        }

        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    }).then(function() {
        res.redirect('/');
    });
});

router.get("/users/:username", function (req, res, next) {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).send('404: File not found!');
        }
        res.render("profile", {
            user: user
        });
    });
});

module.exports = router;