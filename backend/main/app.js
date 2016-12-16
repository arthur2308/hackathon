var express = require('express');
var app = express();
var images = require('./create-data.js');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/build'));

// sample home page request
app.get('/', function (req, res) {
	// TODO: this should serve the main React application
	res.sendfile('./build/index.html');
});


// GET method route for all images
app.get('/api/images', function (req, res) {	
  res.json(images.getAll());
});

// GET method route for specific number of images
app.get('/api/images/:numberImages', function(req, res) {
	var numberImages = Number(req.params['numberImages']);
	res.send(images.getLimit(numberImages));
});

// TODO: create a search API for image tags
app.get('/api/search/:singleTag', function() {
	
});


app.listen(5000, function() {
  console.log('Example app listening on port 5000');
});

