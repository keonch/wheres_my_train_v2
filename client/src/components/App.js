import React, { useEffect } from 'react';
import '../assets/stylesheets/App.css';
import Map from '../containers/MapContainer';

function App(props) {
	const fetchTrains = props.fetchTrains;

	useEffect(() => {
		fetchTrains('ABC');
	}, [fetchTrains]);

	return (
		<div className="App" >
			<Map />
		</div>
	);
}

export default App;
