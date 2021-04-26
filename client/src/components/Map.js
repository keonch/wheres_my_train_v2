import React, { useState, useRef, useEffect, createRef, forwardRef, Component } from 'react';
import { GoogleMap, Marker } from "react-google-maps"; // test
// import { GoogleMap } from '@react-google-maps/api';
import Train from '../containers/TrainContainer';
import merge from 'lodash/merge';

const Map = (props) => {
    const [position, setPosition] = useState({ lat: 40.739221291569855, lng: -73.9825120308387 });

    const updatePosition = () => {
        setPosition({ lat: position.lat - 1, lng: position.lng - 1 });
    }
    console.log(position);
    return (
        <div>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.739221291569855, lng: -73.98251203083879 }}
            >
                <Marker position={position}></Marker>
            </GoogleMap>
            <button onClick={() => updatePosition()}>CLICKKKKKKKKKKKKKKKKKKKK</button>
        </div>
    );
};

export default Map;



// const Map = props => {
//     const [trainRefs, updateTrainRefs] = useState({});
//     const [trainPositionsById, updateTrainPositions] = useState(() => getStartingPositionOfTrains(props.trainIds));
//     // const [position, setPosition] = useState(props.stations[0]);
//     const [trainPosition, setTrainPosition] = useState({ lat: 40.739221291569855, lng: -73.98251203083879 })
//     const train = <Train position={trainPosition} />

//     useEffect(() => {
//         setTimeout(() => {
//             setTrainPosition(prevPosition => {
//                 console.log(prevPosition);
//                 return { lat: 30, lng: 80 };
//             });
//         }, 5000)
//         return () => { };
//     }, []);
//     // const animationIdRef = useRef();
//     // const previousTimeRef = useRef();

//     // const getPosition = (fromPosition, dt) => {
//     //     const prevLat = fromPosition.lat;
//     //     const prevLng = fromPosition.lng;
//     //     return { lat: (prevLat + dt * 0.01) % 100, lng: (prevLng + dt * 0.01) % 100 };
//     // }

//     // const updatePosition = timeStamp => {
//     //     if (previousTimeRef.current != undefined) {
//     //         const dt = timeStamp - previousTimeRef.current;
//     //         setPosition(prevPosition => getPosition(prevPosition, dt));
//     //     }
//     //     previousTimeRef.current = timeStamp;
//     //     animationIdRef.current = requestAnimationFrame(updatePosition);
//     // }

//     // Setup train(marker) refs to invoke setPosition() API
//     useEffect(() => {
//         // props.trainIds.forEach(trainId => {
//         //     const trainRef = createRef(null);
//         // });
//         return () => updateTrainRefs(null);
//     }, [props.trainIds]);

//     // useEffect(() => {
//     //     animationIdRef.current = requestAnimationFrame(updatePosition);
//     //     return () => {
//     //         cancelAnimationFrame(animationIdRef.current);
//     //     }
//     // }, []);
//     console.log(trainPosition.current);
//     return (
//         <GoogleMap
//             defaultZoom={12}
//             defaultCenter={{ lat: 40.739221291569855, lng: -73.98251203083879 }}
//         >
//             {/* {props.trainIds.length > 0 && <Train position={{ lat: 40.739221291569855, lng: -73.98251203083879 }} key={props.trainIds && props.trainIds[0]} id={props.trainIds && props.trainIds[0]} />} */}
//             {/* {props.trains.map(trainId => <Train key={trainId} id={trainId} />)} */}
//             {train}
//         </GoogleMap>
//     )
// };

// export default Map;