import React from 'react';
import '../assets/stylesheets/Controls.css';
import { ICONS_BY_ROUTE } from '../assets/data/ICONS';
import { ICONS_TO_DISPLAY, TRAIN_GROUPS_BY_ROUTE } from '../utils/constants';

function Controls(props) {
    function isActive(route) {
        return props.activeRoutes.has(route) ? 'active' : "";
    };

    function toggleRoute(route) {
        if (isActive(route)) {
            props.deactivateRoute(route);
        } else {
            const trainGroup = TRAIN_GROUPS_BY_ROUTE[route];
            props.activateRoute(route);
            if (trainGroup in props.fetchedTimeStamps) {
                const dt = Date.now() - props.fetchedTimeStamps[trainGroup];
                if (dt < 10000) {
                    console.log(`WAIT ${10 - (dt / 1000)} SECONDS FOR NEW REQUEST`);
                    return;
                }
            }
            props.fetchTrains(trainGroup);
        }
    }

    return (
        <div className="Controls" >
            <h1>Where's My Train?</h1>
            <div className="train-buttons">
                {ICONS_TO_DISPLAY.map(route =>
                    <img
                        src={ICONS_BY_ROUTE[route]}
                        key={route}
                        alt={route}
                        className={`train-button ${isActive(route)}`}
                        onClick={() => toggleRoute(route)}
                    />
                )}
            </div>
        </div>
    );
}

export default Controls;
