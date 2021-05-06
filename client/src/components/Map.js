import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { NEW_YORK_CITY_LATLNG, MAP_STYLE } from '../utils/constants';
import Train from '../containers/TrainContainer';

function Map(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "",
    })

    if (!isLoaded) return <></>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            center={{ ...NEW_YORK_CITY_LATLNG }}
            zoom={12}
            options={{
                styles: MAP_STYLE,
                disableDefaultUI: true,
                zoomControl: true,
            }}
        >
            <h1>te</h1>
            {props.trainIds.map(trainId => <Train key={trainId} trainId={trainId} />)}
        </GoogleMap>
    )
}

export default Map;