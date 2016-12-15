var express = require('express');
var app = express();
//var getData = require('./FirebaseClient');
var images = require('./create-data.js');


// console.log(getData['FirebaseClient']());
// respond with "hello world" when a GET request is made to the homepag
app.get('/', function (req, res) {
	// this should serve the main React application
	res.send('hello world');
});


// GET method route
app.get('/api/images', function (req, res) {	
  // TODO: build data object here
  /*
  res.send({
  	'images': [
		{
			'image1': {
	            "src": "https://www.dropbox.com/s/k1t3w0pj8qnbfgh/child-childrens-baby-children-s.jpg?raw=1",
	            "likes": 49,
	            "comments": ["This is great!", "This is really bad"],
	            "tags":["child","road","tag1"]
			}
		}, 
		{
			'image2': {
	            "src": "https://www.dropbox.com/s/k1t3w0pj8qnbfgh/child-childrens-baby-children-s.jpg?raw=1",
	            "likes": 49,
	            "comments": ["This is great!", "This is really bad"],
	            "tags":["child","road","tag1"]
	        }
		}  	
  	]
  });*/
  res.send(images);
});


app.listen(5000, function() {
  console.log('Example app listening on port 3000')
});

