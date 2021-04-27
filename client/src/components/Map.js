import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { NEW_YORK_CITY_LATLNG } from '../utils/constants';
import { getNextTrainPosition } from '../utils/train-utils';
import { getTrainFromTrainsById } from '../reducers/selectors';
import Train from '../containers/TrainContainer';

function Map(props) {

    // Map Initialization
    // ----------------------------------------------------------
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    // ----------------------------------------------------------

    const [positionsByTrainId, setPositions] = useState({});
    const previousTimeRef = useRef(null);
    const animationRef = useRef(null);

    const updatePositions = timeRef => {
        if (previousTimeRef.current != undefined) {
            const timeNow = Date.now();
            const updatedPositions = {}
            props.trainIds.forEach((trainId, i) => {
                const train = getTrainFromTrainsById(props.trainsById, trainId);
                const prevPosition = positionsByTrainId[trainId];
                const nextPosition = getNextTrainPosition(
                    train,
                    prevPosition,
                    previousTimeRef.current,
                    timeRef,
                    timeNow,
                    i //TEST
                );
                updatedPositions[trainId] = nextPosition;
            });
            setPositions(updatedPositions);
        }
        previousTimeRef.current = timeRef;
        // animationRef.current = requestAnimationFrame(updatePositions);
    }

    useEffect(() => {
        animationRef.current = requestAnimationFrame(updatePositions);
    }, [props.trainIds]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            center={{ ...NEW_YORK_CITY_LATLNG }}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {props.trainIds.map(trainId => <Train key={trainId} position={positionsByTrainId[trainId]} />)}
        </GoogleMap>
    ) : <></>
}

export default Map;