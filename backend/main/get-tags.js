var Clarifai = require('clarifai');

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

console.log(getTags('https://images.pexels.com/photos/108061/pexels-photo-108061.jpeg?h=350&auto=compress'));