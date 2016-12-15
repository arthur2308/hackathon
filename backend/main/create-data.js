var Clarifai = require('clarifai');
var faker = require('faker');


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
	app.models.predict(Clarifai.GENERAL_MODEL, 'https://www.dropbox.com/s/n2zbkj0nxx8lr2u/pexels-photo-179909.jpeg?raw=1').then(
	  function(response) {
	  	// TODO: save the response
	  	console.log('FULL RESPONSE');
	    console.log(response);
	    console.log('RESULTS');
	    var response_data = response.data.outputs[0];
	    // prints all the generated tags for the images 
	    response_data['data']['concepts'].forEach((x) => {
	    	console.log(x['name']);
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
	var component = {
		'src' : url,
		'likes' : Math.floor((Math.random() * 2000) + 1),
		// 'comments': ['random-comment1', 'random-comment-2'],
		'tags': getTags(url)
	};

	component['comments'] = [];
	var numComments = Math.floor((Math.random() * 15) + 1);
	for (var i = 0; i < numComments; i++) {
		component['comments'].push(faker.lorem.sentence());
	}
    // "src": "https://images.pexels.com/photos/108061/pexels-photo-108061.jpeg?h=350&auto=compress",
    // "likes": 49,
    // "comments": ["This is great!", "This is really bad"],
    // "tags":["child","road","tag1"]

	return component;
}

// generate a bunch of image components
for (var i = 0; i < 10; i++) {
	images['images'].push(createImageComponent('https://images.pexels.com/photos/108061/pexels-photo-108061.jpeg?h=350&auto=compress'));
}

module.exports = images;
