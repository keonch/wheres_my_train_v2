import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import Map from './Map';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="App" >
				<Map></Map>
			</div>
		);
	}
}

export default App;
