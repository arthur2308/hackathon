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
	'https://images.pexels.com/photos/24155/pexels-photo.jpg?h=350&auto=compress',
	'https://images.pexels.com/photos/157866/sunglasses-glasses-sun-sun-protection-157866.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/157888/fashion-glasses-go-pro-female-157888.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/157888/fashion-glasses-go-pro-female-157888.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/157907/smile-color-laugh-black-157907.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/6839/fashion-woman-cute-airport.jpg?h=350&auto=compress',
	'https://images.pexels.com/photos/70845/girl-model-pretty-portrait-70845.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/72699/minimalism-minimal-72699.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/7307/pexels-photo.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/7529/pexels-photo.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/87350/pexels-photo-87350.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/91986/pexels-photo-91986.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/245931/pexels-photo-245931.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/246367/pexels-photo-246367.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/246804/pexels-photo-246804.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/247836/pexels-photo-247836.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/25488/pexels-photo-25488.jpg?h=350&auto=compress',
	'https://images.pexels.com/photos/25772/pexels-photo-25772.jpg?h=350&auto=compress'
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

// writes components to file
function writeToFile() {
	var jsonString = JSON.stringify(images);
	fs.writeFile('images.json', jsonString, 'utf8', function(err) {
		if (err) {
			console.log(err);
		}
	});
}

function createImageComponent(url) {
	var numLikes = Math.floor((Math.random() * 2000) + 1);
	var component = {
		'src' : url,
		'likes' : numLikes,
		'width': '30%',
		'tags': getTags(url),
		'lightboxImage': {
			'src' : url,
			'caption' : 'Likes: ' + numLikes
		}
	};


	return component;
}

function main() {
	for (var i = 0; i < urls.length; i++) {

		images['images'].push(createImageComponent(urls[i]));

	}
	writeToFile();
}


main();