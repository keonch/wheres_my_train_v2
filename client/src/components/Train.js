import React, { useRef } from 'react';
import { Marker } from 'react-google-maps'; // Test
// import { Marker } from '@react-google-maps/api';

const Train = (props) => {
    const positionRef = useRef(props.stations && props.stations[0]);

    return (
        <Marker
            position={positionRef.current}
            icon={props.icon}
        ></Marker>
    )
}

export default Train;