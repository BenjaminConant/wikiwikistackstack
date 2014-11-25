var express = require('express');
var router = express.Router();
var Page = require('../models/index.js').Page;


router.get('/', function(req, res) {
  res.redirect('/');
});

router.post('/delete/:url', function(req, res){
	var url = req.params.url;
	Page.remove({url_name: url}, function(err) {
		res.redirect('/');
	})
	
})

router.post('/edit/:url', function(req, res){
	var url = req.params.url;
	Page.findOne({url_name: url}, function(err, data){
		console.log(data);
		res.render('edit_pages', {title: "wikiwikistackstack", pageHeader:"Edit post equaling =>>" + data.title, page: data});
	})
})

router.post('/edit/success/:url', function(req, res){
	var url = req.params.url;
	postTitle = req.body.postTitle;
	postBody = req.body.postBody;
	postUrl = postTitle.replace(/\W+/g, "_")
	Page.findOneAndUpdate({url_name: url}, {title: postTitle, body: postBody, url_name: postUrl}, function(err, data){
		res.redirect('/');
	})
})

router.post('/edit/cancel/:url', function(req, res){
	var url = req.params.url;
	res.redirect('/wiki/' + url);
})

router.get('/id/:id', function(req, res){
	var pageId = req.params.id;
	console.log("got to id router!!!!!!!!!!!!!!!!!")
	Page.findById(pageId, function(err, data){
		console.log(data);
		res.render('pages', {title: "wikiwikistackstack", pageHeader: data.title, page: data});
	})
})

router.get('/:url', function(req, res){
	var url = req.params.url;
	Page.find({url_name: url}, function(err, data){
		console.log(data);
		if (data.length > 1) {
			res.render('disambig', {title: "wikiwikistackstack", pageHeader: "this is the disambigs for " + data[0].title, docs: data});
		} else {
			var doc = data[0];
			res.render('pages', {title: "wikiwikistackstack", pageHeader: doc.title, page: doc});
		}
	})
});

module.exports = router;
