import React from 'react';
import TrainMarker from '../containers/TrainMarkerContainer';

function Trains(props) {
    return (
        <div>
            {props.trainIds.map(trainId => <TrainMarker key={trainId} trainId={trainId} />)}
        </div>
    )
}

export default Trains;