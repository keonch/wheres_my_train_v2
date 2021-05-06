import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { NEW_YORK_CITY_LATLNG } from '../utils/constants';
import Train from '../containers/TrainContainer';
import MAP_STYLE from '../assets/data/MAP_STYLE.json'

function Map(props) {
    // ----------------------------------------------------------
    // --------------------Map Initialization--------------------
    // ----------------------------------------------------------
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "",
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
    // ----------------------------------------------------------
    // ----------------------------------------------------------

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            center={{ ...NEW_YORK_CITY_LATLNG }}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                styles: MAP_STYLE,
                disableDefaultUI: true,
                zoomControl: true,
                zoom: 12
            }}
        >
            {props.trainIds.map(trainId => <Train key={trainId} trainId={trainId} />)}
        </GoogleMap>
    ) : <></>
}

export default Map;