import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Marker } from 'react-google-maps'; // Test
// import { Marker } from '@react-google-maps/api';

const Train = props => {
    return (
        <Marker
            position={props.position}
            icon={props.icon}
        ></Marker>
    )
};

export default Train;