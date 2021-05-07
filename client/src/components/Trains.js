import React from 'react';
import Train from '../containers/TrainContainer';

function Trains(props) {
    return (
        <div>
            {props.trainIds.map(trainId => <Train key={trainId} trainId={trainId} />)}
        </div>
    )
}

export default Trains;