import React, { Component } from 'react';
import { GoogleMap } from "react-google-maps"; // test
// import { GoogleMap } from '@react-google-maps/api';
import Train from '../containers/TrainContainer';

// TEST
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.739221291569855, lng: -73.98251203083879 }}
                ref={this.canvasRef}
            >
                {this.props.trains.map(trainId => <Train key={trainId} id={trainId} />)}
            </GoogleMap>
        )
    }
}

export default Map;

// const Map = (props) => {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: ""
//     });

//     const [map, setMap] = useState(null)

//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds();
//         map.fitBounds(bounds);
//         setMap(map)
//     }, [])

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])
//     console.log(props);
//     return isLoaded ? (
//         <GoogleMap
//             defaultZoom={12}
//             defaultCenter={{
//                 lat: 40.739221291569855, lng: - 73.98251203083879
//             }}
//         >
//             { props.trains.map(trainId => <Train key={trainId} id={trainId} />)}
//         </GoogleMap >
//     ) : <></>
// }

// export default Map;