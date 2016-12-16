var Clarifai = require('clarifai');
var faker = require('faker');

var fs = require('fs');


var urls = [
	'https://images.pexels.com/photos/108061/pexels-photo-108061.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/157888/fashion-glasses-go-pro-female-157888.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/167890/pexels-photo-167890.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/175696/pexels-photo-175696.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/192774/pexels-photo-192774.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/199165/pexels-photo-199165.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/212236/pexels-photo-212236.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/217860/pexels-photo-217860.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/24155/pexels-photo.jpg?h=350&auto=compress',
	'https://images.pexels.com/photos/24155/pexels-photo.jpg?h=350&auto=compress'
];


var images = {
	'images': []
};


function getTags(url) {
	var app = new Clarifai.App(
	  'tW_HhGJ4as-kaqDvIXKYOkw1BKfhWIUiGSGXrb9f',
	  'sAop-lRKgGlMWXjb8O00JnpQXKZ7BYhDQWu396oB'
	);

	var tags = [];

	// parameter: image url 
	app.models.predict(Clarifai.GENERAL_MODEL, url).then(
	  function(response) {
	    var response_data = response.data.outputs[0];
	    // prints all the generated tags for the images 
	    response_data['data']['concepts'].forEach((x) => {
	    	// console.log(x['name']);
	    	tags.push(x['name']);
	    });
	  },

	  function(err) {
	    console.error(err);
	  }
	);
	return tags;
}



function createImageComponent(url) {
	var numLikes = Math.floor((Math.random() * 2000) + 1);
	var component = {
		'src' : url,
		'likes' : numLikes,
		// 'comments': ['random-comment1', 'random-comment-2'],
		'tags': getTags(url),
		'lightboxImage': {
			'src' : url,
			'caption' : 'Likes: ' + numLikes
		}
	};

	/*
	component['comments'] = [];
	var numComments = Math.floor((Math.random() * 15) + 1);
	for (var i = 0; i < numComments; i++) {
		component['comments'].push(faker.lorem.sentence());
	}
	*/

	return component;
}

function createAllComponents() {
	// generate a bunch of image components
	for (var i = 0; i < urls.length; i++) {
		images['images'].push(createImageComponent(urls[i]));
	}
}

function getAllImages() {
	return images;
}

// return passed number of random image components
function getLimit(number) {
	var totalImages = urls.length;
	var result = {
		'images': []
	};
	for (var i = 0; i < number; i++) {
		var randomIndex = Math.floor((Math.random() * totalImages) + 1);
		result['images'].push(images['images'][randomIndex]);
	}
	return result;
}

// writes components to file
function writeToFile() {
	var jsonString = JSON.stringify(images);
	fs.writeFile('myjsonfile.json', jsonString, 'utf8', function(err) {
		if (err) {
			console.log(err);
		}
	});
}

function main() {
	createAllComponents();
	writeToFile();
}

main();

module.exports = {
	getAll: getAllImages,
	getLimit: getLimit
};

