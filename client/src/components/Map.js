import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MAP_STYLE, NEW_YORK_CITY_LATLNG } from '../assets/data/CONSTANTS';
import Trains from '../containers/TrainsContainer';

function Map(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    })

    if (!isLoaded) return <></>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            zoom={12}
            center={NEW_YORK_CITY_LATLNG}
            options={{
                styles: MAP_STYLE,
                disableDefaultUI: true,
                zoomControl: true
            }}
        >
            <Trains />
        </GoogleMap>
    )
}

export default Map;