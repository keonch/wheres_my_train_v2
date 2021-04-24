import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Polyline, Marker } from 'react-google-maps';
import icon from '../assets/images/NYCS-bull-trans-Q.svg';

function GMap() {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 20.291, lng: 153.027 }}>
            <Marker position={{ lat: 20.291, lng: 153.027 }} />
            <Polyline
                path={[
                    { lat: 22.291, lng: 153.027 },
                    { lat: 18.291, lng: 153.027 },
                ]}
                options={{
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    icons: [{ icon, offset: '100%' }]
                }}
            ></Polyline>
        </GoogleMap>
    )
}

const ABC = withScriptjs(withGoogleMap(GMap));

export default function Map() {
    console.log(process.env);
    return (
        <div>
            <ABC
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: '100vh' }}></div>}
                containerElement={<div style={{ height: '100vh' }}></div>}
                mapElement={<div style={{ height: '100vh' }}></div>}
            >
                <Marker position={{ lat: 20.291, lng: 153.027 }} />
                <Polyline
                    path={[
                        { lat: 22.291, lng: 153.027 },
                        { lat: 18.291, lng: 153.027 },
                    ]}
                    options={{
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        icons: [{ icon, offset: '100%' }]
                    }}
                ></Polyline>
            </ABC>
        </div >
    )
}