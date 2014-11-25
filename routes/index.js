var express = require('express');
var router = express.Router();
var Page = require('../models/index.js').Page;
var User = require('../models/index.js').User;

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}


router.get('/', function(req, res) {
  Page.find({}, function(err, data){
  	  res.render('index', {title: "wikiwikistackstack", pageHeader: "wikiwikistackstack homiehomebobs muchlookatpgs!!", navBarActiveIndex: "active", docs: data});
  })
});

router.get('/about_us', isAuthenticated, function(req, res){
  console.log(req.user);
  res.render('about_us', { pageHeader: "Willcomens " + req.user.username, user: req.user });
});


// router.get('/about_us', isAuthenticated, function(req, res) {
// 	res.render('about_us', {title: "wikiwikistackstack", pageHeader: "weareBEST in numberoneTopQualitywikiwikistacks!", navBarActiveAbout: "active"});
// })

router.get('/auth', function(req, res) {
	res.render('auth', {title: "wikiwikistackstack", pageHeader: "Logins Please for such happy!!"});
})

router.get('/create_account', function(req, res) {
	res.render('create_account', {title: "wikiwikistackstack", pageHeader: "Big MAKEYOUaccount"});
})

router.post('/create_account/submit', function(req, res) {
	var newUser = new User({username: req.body.username, password: req.body.password});
	newUser.save(function(err) {
		if (err) throw err;
		console.log('we made a user!!!');
		res.render('user_created', {pageHeader: "Wilkomens "+ req.body.username});
	});
})





module.exports = router;
