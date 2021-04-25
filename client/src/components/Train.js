import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

class Train extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: props.stations && props.stations[0],
        };
    }

    render() {
        console.log(this.props);
        return (
            <Marker
                position={this.state.position}
                icon={this.props.icon}
            ></Marker>
        )
    }
}

export default Train;
