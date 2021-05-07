import React from 'react';
import '../assets/stylesheets/Controls.css';
import { ICONS_BY_ROUTE } from '../assets/data/ICONS';
import { ICONS_TO_DISPLAY } from '../assets/data/CONSTANTS';
import ENDPOINTS_BY_ROUTE from '../assets/data/ENDPOINTS_BY_ROUTE.json';

function Controls(props) {
    function toggleRoute(route) {
        // SHOW SS WITH SI
        if (props.activeRoutes.has(route)) {
            props.deactivateRoute(route);
            if (route === 'SI') {
                props.deactivateRoute('SS');
            }
        } else {
            const trainGroup = ENDPOINTS_BY_ROUTE[route];
            props.activateRoute(route);
            if (route === 'SI') {
                props.activateRoute('SS');
            }
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
        <div className="Controls">
            <h1>Where's My Train?</h1>
            <div className="train-buttons">
                {ICONS_TO_DISPLAY.map(route =>
                    <div key={route + '_button'} className={`train-button  ${props.activeRoutes.has(route) ? 'active' : ""}`}>
                        <img
                            src={ICONS_BY_ROUTE[route]}
                            key={route + '_icon'}
                            alt={route}
                            className={`train-icon`}
                            onClick={() => toggleRoute(route)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Controls;
