import React from 'react';
import { Marker } from '@react-google-maps/api';

function Train(props) {
    return (
        <Marker
            position={props.position}
        ></Marker>
    )
};

export default Train;