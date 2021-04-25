import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import MapWrapper from './MapWrapper';

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
				<MapWrapper />
			</div>
		);
	}
}

export default App;
