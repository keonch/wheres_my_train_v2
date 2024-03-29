import React, { useState, useEffect, useRef } from 'react';
import { Marker } from '@react-google-maps/api';
import { interpolatePosition } from '../utils/train';

function TrainMarker(props) {
    const [position, setPosition] = useState(props.train.latLngs[0]);
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

        const removeSelf = () => {
            props.removeTrain(props.train);
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
                    setTimeout(removeSelf, 10000);
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
            } else {
                return;
            }

            requestAnimationFrame(animate);
        };

        loadLine(0);
        requestAnimationFrame(function (timestamp) {
            startTime.current = Date.now();
            startTimeStamp.current = timestamp;
            animate(timestamp);
        });
    }, []);

    return (
        <Marker
            position={position}
            icon={{
                url: props.icon,
                scaledSize: new window.google.maps.Size(25, 25),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(13, 13),
            }}
        ></Marker>
    )
};

export default TrainMarker;