import React, { Component } from 'react';
import '../assets/stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getFeed = this.getFeed.bind(this);
  }

  componentDidMount() {
    this.getFeed();
  }

  getFeed = () => {
    fetch('/api/fetch_gtfs_feed')
      .then(res => {
        console.log(res.json());
      })
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="App" >
        HELLO WORLD
      </div>
    );
  }
}

export default App;
