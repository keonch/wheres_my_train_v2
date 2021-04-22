import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };

    this.get_feed = this.get_feed.bind(this);
  }

  componentDidMount() {
    this.get_feed();
  }

  get_feed = () => {
    fetch('/api/fetch_gtfs_feed')
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div className="App">
        HELLO WORLD
        {this.state.data}
      </div>
    );
  }
}

export default App;
