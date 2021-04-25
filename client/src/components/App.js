import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import MapWrapper from './MapContainer';

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
				<MapWrapper />
			</div>
		);
	}
}

export default App;
