import React from 'react';
import '../assets/stylesheets/App.css';
import Controls from '../containers/ControlsContainer';
import Map from '../components/Map';

function App(props) {
	return (
		<div className="App" >
			<Controls />
			<Map />
		</div>
	);
}

export default App;
