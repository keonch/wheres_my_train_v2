import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Wrapper = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 40.739221291569855, lng: -73.98251203083879 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
))

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Wrapper
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={< div style={{ height: `100vh` }} />}
                containerElement={< div style={{ height: `100vh` }} />}
                mapElement={< div style={{ height: `100vh` }} />}
            />
        )
    }
}

export default Map;