var Clarifai = require('clarifai');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

// grabs photos from image url
function grabPhotos() {
	var url = 'https://www.pexels.com/search/clothes/';
	request(url, function(error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);
			var imageSections = $('.photo-item a img');
			Object.keys(imageSections).forEach((x) => {
			 	var image = imageSections[x]['attribs'];
			 	if (image) {
			 		console.log(image['src']);
			 	}
			});

		} else if (error) {
			console.log('error loading web page');
			console.error(error);
		}
	});
}


// var dropbox_access_token = 'gjy5r75xwjhvs26';


function uploadFile() {
  var dbx = new Dropbox({ 
  	accessToken: dropbox_access_token 
  });

  var fileInput = document.getElementById('file-upload');
  var file = fileInput.files[0];
  dbx.filesUpload({path: '/' + file.name, contents: file})
    .then(function(response) {
      var results = document.getElementById('results');
      results.appendChild(document.createTextNode('File uploaded!'));
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
  return false;
}

grabPhotos();




/* loads tags from images 

var app = new Clarifai.App(
  'tW_HhGJ4as-kaqDvIXKYOkw1BKfhWIUiGSGXrb9f',
  'sAop-lRKgGlMWXjb8O00JnpQXKZ7BYhDQWu396oB'
);

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
    });


  },

  function(err) {
    console.error(err);
  }
);

*/