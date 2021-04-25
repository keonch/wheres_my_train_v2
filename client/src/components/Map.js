import React, { Component } from 'react';
import { GoogleMap, Marker } from "react-google-maps"

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [40.748774, -73.985763],
            numDeltas: 100,
            delay: 1000,
            i: 0,
            deltaLat: 40.748774,
            deltaLng: -73.985763,
            newPosition: [40.807533217393356, -73.93484135418342]
        };

        this.transition = this.transition.bind(this);
        this.moveMarker = this.moveMarker.bind(this);
    }

    transition(result) {
        this.state.deltaLat = (result[0] - this.state.position[0]) / this.state.numDeltas;
        this.state.deltaLng = (result[1] - this.state.position[1]) / this.state.numDeltas;
        this.moveMarker();
    }

    moveMarker = () => {
        const lng = this.state.position[0] + this.state.deltaLat;
        const lat = this.state.position[1] + this.state.deltaLng;
        if (this.state.i != this.state.numDeltas) {
            const j = this.state.i + 1
            setTimeout(this.moveMarker, this.state.delay);
            this.setState({
                i: j,
                position: [lng, lat]
            });
            console.log(j);
        }
    }

    componentDidMount() {
        this.transition(this.state.newPosition);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.739221291569855, lng: -73.98251203083879 }}
            >
                <Marker position={{ lat: this.state.position[0], lng: this.state.position[1] }} />
            </GoogleMap>
        )
    }
}

export default Map;