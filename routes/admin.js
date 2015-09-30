var express = require('express');
var router = express.Router();
var session = require('client-sessions');

router.post("/", function (req, res, next) {
    if (req.body.username == "essa" && req.body.password == "123") {
        delete req.session['errorMessage'];
        var sess = req.session;
        sess.name = req.body.username;
        sess.auth = true;
        res.redirect('/admin/dashboard');
    } else {
        req.session.errorMessage = "Username and Password are Invalid";
        res.redirect('/admin');
    }
});

router.get('/logout', function (req, res) {
    req.session.reset();
    res.redirect('/admin');
});

router.get('/:page?', function (req, res, next) {
    if (!req.params.page) {
        var err = (req.session.errorMessage) ? req.session.errorMessage : undefined;
        res.render('admin/admin', {title: 'Admin', error: err});
    } else {
        if (req.session.auth) {
            switch (req.params.page) {
                case "dashboard":
                    res.locals.title = "Dashboard";
                    res.render('admin/dashboard', req.session);
                    break;
                default:
                    next();
            }
        }
    }
});

module.exports = router;