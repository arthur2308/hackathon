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
            "photos" : [],
            "searchMode": false
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadMorePhotos();
    }

    handleScroll() {
            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                    this.loadMorePhotos();
                }
            }.bind(this));
    }

    handleSearch() {
        var query = $("#textInput").val();

        if (query) {
            this.setState({
                "searchMode" : true
            });
        }
        else {
            this.setState({
                "searchMode" : false
            });
            return;
        }

        var newPhotos = null;

        $.ajax({
            url:"http://localhost:5000/api/search/" + query,
            async: false,
            success: function (data) {
                newPhotos = data;
            },
            error: (err) => console.error(err.message)
        });

        this.setState({
            "photos" : newPhotos.images
        });
    }

    loadMorePhotos() {

        if(this.state.searchMode === true) {
            return;
        }
        else {
            var newPhotos = null;

            $.ajax({
                url: 'http://localhost:5000/api/images',
                //url: 'https://stark-sierra-45832.herokuapp.com/api/images',
                async: false,
                success: function (data) {
                    newPhotos = data;
                },
                error: function (err) {
                    console.error(err.message);
                }
            });

            this.setState({
                "photos": this.state.photos ? this.state.photos.concat(newPhotos.images) : newPhotos.images
            });
        }
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
            <input id="textInput" onKeyUp={this.handleSearch}/>
        </div>
        {
            this.renderGallery()
        }
      </div>
    );
  }
}

export default App;
