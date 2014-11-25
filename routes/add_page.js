var express = require('express');
var router = express.Router();
var Page = require('../models/index.js').Page;



/* GET home page. */
router.get('/', function(req, res) {
  res.render('add_page', {title: "wikiwikistackstack", pageHeader: "addsuch PAGES!!", navBarActiveAddPage: "active" });
});

router.post('/submit' , function(req, res) {
	postTitle = req.body.postTitle;
	postBody = req.body.postBody;
	postUrl = postTitle.replace(/\W+/g, "_")
	console.log("- " + postTitle + " - " + postBody + " - " + postUrl);
	Page.create({title: postTitle, body: postBody, url_name: postUrl}, function(err, data){
		console.log(data);
		res.redirect('/');
	});

	
})

module.exports = router;