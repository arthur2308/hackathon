import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import $ from 'jquery';
import Gallery from 'react-photo-gallery'
import _ from 'lodash';

class App extends Component {
    constructor() {
        super();

        this.state = {
            "photos" : [
                {
                    "src": "https://images.pexels.com/photos/167890/pexels-photo-167890.jpeg?h=350&auto=compress",
                    "tags":["child","road","tag1"],
                    "lightboxImage":{
                        "src": 'https://images.pexels.com/photos/167890/pexels-photo-167890.jpeg?h=350&auto=compress',
                        "caption": 'Likes: 52'
                    }
                },
                    {
                        "src": "https://images.pexels.com/photos/192774/pexels-photo-192774.jpeg?h=350&auto=compress",
                        "tags":["fashion","woman","airport"],
                        "lightboxImage":{
                            "src": 'https://images.pexels.com/photos/192774/pexels-photo-192774.jpeg?h=350&auto=compress',
                            "caption": 'Likes: 54'
                        }
                    },
                ]
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadMorePhotos();
    }

    handleScroll() {
        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

                console.log('Reached bottom');
                this.loadMorePhotos();
            }
        }.bind(this));
    }

    loadMorePhotos() {
        var newPhotos = null;

        $.ajax({
            url: 'http://localhost:5000/api/images',
            async: false,
            success: function(data) {

                newPhotos = data;
                //console.log(JSON.stringify(this.state.photos.concat(newPhotos)));
                console.log(newPhotos);
                /*newPhotos = data.images
                    .forEach(image => console.log(image));*/

                //console.log(newPhotos);
            },
            error: function(err) {
                console.error(err.message);
            }
        });

        this.setState({
            "photos" : this.state.photos ? this.state.photos.concat(newPhotos.images) : newPhotos.images
        });
    }

    renderGallery() {
        return (
            <Gallery photos={this.state.photos} />
        );
    }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nordstrom Fashion</h2>
        </div>
          {this.renderGallery()}
      </div>
    );
  }
}

export default App;
