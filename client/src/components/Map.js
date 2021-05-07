import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MAP_STYLE } from '../utils/constants';
import Trains from '../containers/TrainsContainer';

function Map(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBbrjYPvl5Ty9IQ8eM05omrNFd1mAuX120",
    })

    if (!isLoaded) return <></>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            zoom={12}
            options={{
                styles: MAP_STYLE,
                disableDefaultUI: true,
                zoomControl: true,
                center: {
                    lat: 40.739221291569855,
                    lng: -73.98251203083879
                }
            }}
        >
            <Trains />
        </GoogleMap>
    )
}

export default Map;