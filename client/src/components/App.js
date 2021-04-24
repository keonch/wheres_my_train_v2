import React, { Component } from 'react';
import '../assets/stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTrains('7');
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
