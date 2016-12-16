import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import $ from 'jquery';
import Gallery from 'react-photo-gallery'
import _ from 'lodash';

// react components
//import VideoBackground from './VideoBackground.js';
import ReactPlayer from 'react-player'
import SideBar from './SideBar.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            "photos" : []
        }
        /*
        this.state = {
            "photos" : [
                {
                    "src": "https://www.dropbox.com/s/k1t3w0pj8qnbfgh/child-childrens-baby-children-s.jpg?raw=1",
                    "likes": 49,
                    "comments": ["This is great!", "This is really bad"],
                    "tags":["child","road","tag1"],
                    "date": Date.now(),
                    "width": 0,
                    "height": 0,
                    "aspectRatio":1,
                    "lightboxImage":{
                        "src": 'https://preview2.netcarshow.com/Honda-Accord_HB-1985-hd.jpg',
                        "caption": 'Likes: 52'
                    }
                },
                    {
                        "src": "https://www.dropbox.com/s/loox1o0574nanwj/fashion-woman-cute-airport.jpg?raw=1",
                        "likes": 52,
                        "comments": ["This is great!", "This is really bad"],
                        "date": Date.now(),
                        "tags":["fashion","woman","airport"],
                        "width": 681,
                        "height": 1024,
                        "lightboxImage":{
                            "src": 'https://www.dropbox.com/s/loox1o0574nanwj/fashion-woman-cute-airport.jpg?raw=1',
                            "caption": 'Likes: 52'
                        }
                    },
                ]
        }; */
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
            //url: 'http://localhost:5000/api/images',
            url: 'https://stark-sierra-45832.herokuapp.com/api/images',
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

    endVideo() {
        console.log('video has ended');
        $('#video-background').fadeOut(1000, 'swing', function() {
            $('.App-header').fadeIn(1500);
        });
    }


  render() {
    return (
      <div className="App">
        <SideBar />
        <div id="video-background">
            <ReactPlayer 
                url='https://www.youtube.com/watch?v=dMw1icYNmFE' 
                playing 
                width="100%" 
                height="100%"
                onEnded={this.endVideo} />
        </div>
        <div className="App-header">  
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Winter catalog</h2>

        </div>
        {/*}
        <ImageRow />
        */}
        {
            this.renderGallery()
        }
        
      </div>
    );
  }
}

export default App;
