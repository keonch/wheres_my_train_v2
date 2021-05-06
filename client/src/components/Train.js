import React, { useState, useEffect, useRef } from 'react';
import { Marker } from '@react-google-maps/api';

function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

function Train(props) {
    const [latLng, setLatLng] = useState(() => props.train.latLngs[0]);

    // useInterval(() => {
    //     setLatLng({
    //         lat: latLng.lat + 0.000005,
    //         lng: latLng.lng + 0.000005
    //     });
    // }, 60);

    return (
        <Marker
            position={latLng}
        ></Marker>
    )
};

export default Train;