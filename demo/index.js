import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import ReactSwipe from '../src/reactSwipe';

import './index.css';

const query = querystring.parse(window.location.search.slice(1));

// generate slide panes
const numberOfSlides = parseInt(query.slidesNum, 10) || 20;
const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {
  return (
    <div className="itemWrap" key={i} onClick={()=>{console.log('hahahahha', i);}}>
      <div className="item">{i}</div>
    </div>
  );
});

// change Swipe.js options by query params
const startSlide = parseInt(query.startSlide, 10) || 0;
const swipeOptions = {
  startSlide: startSlide < paneNodes.length && startSlide >= 0 ? startSlide : 0,
  auto: parseInt(query.auto, 10) || 0,
  margin: parseInt(query.margin, 10) || 0,
  degree: parseInt(query.degree, 10) || 0,
  speed: parseInt(query.speed, 10) || 2000,
  touchSpeed: parseInt(query.touchSpeed, 10) || 300,
  disableScroll: query.disableScroll === 'true',
  stopPropagation: query.stopPropagation === 'true',
  continuous: query.continuous === 'true',
  callback(cur, curDom) {
    console.log('slide changed', cur, curDom);
  },
  transitionEnd() {
    console.log('ended transition');
  }
};

class Page extends Component {
  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  render() {
    return (
      <div className="center">
        <h1>ReactSwipe.js</h1>
        <h2>Open this page from a mobile device (real or emulated).</h2>
        <h2>You can pass <a href="https://github.com/voronianski/swipe-js-iso#config-options">Swipe.js options</a> as query params.</h2>

        <ReactSwipe ref="reactSwipe" className="mySwipe" swipeOptions={swipeOptions}>
            {paneNodes}
        </ReactSwipe>

        <div>
          <button type="button" onClick={()=>{this.prev()}}>Prev</button>
          <button type="button" onClick={()=>{this.next()}}>Next</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
