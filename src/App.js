import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Container from './Components/Post/Container';
import $ from 'jquery';
import Gallery from 'react-photo-gallery'


class App extends Component {
    constructor() {
        super();

        this.state = {photos : [{
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
        ]};
        this.handleScroll = this.handleScroll.bind(this);
        //this.loadMoreContent = this.loadMoreContent.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                this.setState({
                    photos : this.state.photos.concat([
                        {
                            "src": "https://www.dropbox.com/s/uuth6vy0hahw0mg/pexels-photo-175696.jpeg?raw=1",
                            "likes": 52,
                            "comments": ["This is great!", "This is really bad"],
                            "date": Date.now(),
                            "width": 681,
                            "tags":["pexel","dropbox","1738"],
                            "height": 1024,
                            "lightboxImage":{
                                "src": 'https://www.dropbox.com/s/uuth6vy0hahw0mg/pexels-photo-175696.jpeg?raw=1',
                                "caption": 'Likes: 52'
                            }
                        }]
                        )
                });
            }
        });
    }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nordstrom Fashion</h2>
        </div>
          <Gallery photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
