import React, { useState, useEffect, useRef } from 'react';
import { Marker } from '@react-google-maps/api';
import { interpolatePosition } from '../utils/train_utils';

function Train(props) {
    const [position, setPosition] = useState(props.train.latLngs[0]);
    const [isVisible, setVisibility] = useState(true);
    const currentDuration = useRef(0);
    const currentIndex = useRef(0);
    const startTime = useRef(0);
    const startTimeStamp = useRef(0);
    const currentLine = useRef([]);

    useEffect(() => {
        const loadLine = (i) => {
            currentIndex.current = i;
            currentDuration.current = props.train.durations[i];
            currentLine.current = props.train.latLngs.slice(i, i + 2);
        };

        const hideTrain = () => {
            setVisibility(false);
        };

        const updateLine = (timestamp) => {
            let elapsedTime = timestamp - startTimeStamp.current;

            if (elapsedTime <= currentDuration.current) {
                return elapsedTime;
            }

            let lineIndex = currentIndex.current;
            let lineDuration = currentDuration.current;

            while (elapsedTime > lineDuration) {
                elapsedTime -= lineDuration;
                lineIndex++;

                // end
                if (lineIndex >= props.train.latLngs.length - 1) {
                    setPosition(props.train.latLngs[props.train.latLngs.length - 1]);
                    setTimeout(hideTrain, 10000);
                    return null;
                }
                lineDuration = props.train.durations[lineIndex];
            }

            loadLine(lineIndex);
            startTimeStamp.current = timestamp - elapsedTime;
            startTime.current = Date.now() - elapsedTime;
            return elapsedTime;
        };

        const animate = (timestamp) => {
            const elapsedTime = updateLine(timestamp);
            if (elapsedTime != null) {
                const p = interpolatePosition(
                    currentLine.current[0],
                    currentLine.current[1],
                    currentDuration.current,
                    elapsedTime
                );
                setPosition(p);
            }

            requestAnimationFrame(animate);
        };
        loadLine(0);
        // requestAnimationFrame(function (timestamp) {
        //     startTime.current = Date.now();
        //     startTimeStamp.current = timestamp;
        //     animate(timestamp);
        // });
    }, [props.train]);

    return (
        <Marker
            position={position}
            visible={isVisible.current}
            icon={props.icon}
        ></Marker>
    )
};

export default Train;