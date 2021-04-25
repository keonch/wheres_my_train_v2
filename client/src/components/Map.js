import React, { Component } from 'react';
import { GoogleMap } from "react-google-maps"
import Train from '../containers/TrainContainer';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.739221291569855, lng: -73.98251203083879 }}
            >
                {this.props.trains.map(trainId => <Train key={trainId} id={trainId} />)}
            </GoogleMap>
        )
    }
}

export default Map;