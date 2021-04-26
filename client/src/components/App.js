import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
// import Map from '../containers/MapContainer';
import Map from './MapWrapper'; // Test

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchTrains('ABC');
	}

	render() {
		return (
			<div className="App" >
				<Map />
			</div>
		);
	}
}

export default App;
