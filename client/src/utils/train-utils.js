function interpolatePosition(p1, p2, duration, t) {
    let k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;
    return {
        lat: (p1.lat + k * (p2.lat - p1.lat)),
        lng: (p1.lng + k * (p2.lng - p1.lng))
    };
};

const MARKER_STATES = {
    notStarted: 0,
    ended: 1,
    running: 2
}

const markerFunctions = ({
    initialize: function (latlngs, durations) {
        L.Marker.prototype.initialize.call(this, latlngs[0]);

        this._latlngs = latlngs
        this._durations = durations;
        this._currentDuration = 0;
        this._currentIndex = 0;

        this._state = MARKER_STATES.notStarted;
        this._startTime = 0;
        this._startTimeStamp = 0;  // timestamp given by requestAnimFrame
        this._pauseStartTime = 0;
        this._animId = 0;
        this._currentLine = [];
    },

    isRunning: function () {
        return this._state === MARKER_STATES.running;
    },

    isEnded: function () {
        return this._state === MARKER_STATES.ended;
    },

    isStarted: function () {
        return this._state !== MARKER_STATES.notStarted;
    },

    start: function () {
        if (this.isRunning()) {
            return;
        }
        this._loadLine(0);
        this._startAnimation();
    },

    stop: function () {
        if (this.isEnded()) {
            return;
        }

        this._stopAnimation();
        this._state = MARKER_STATES.ended;
    },

    _startAnimation: function () {
        this._state = MARKER_STATES.running;
        this._animId = requestAnimationFrame(function (timestamp) {
            this._startTime = Date.now();
            this._startTimeStamp = timestamp;
            this._animate(timestamp);
        });
    },

    _stopAnimation: function () {
        cancelAnimationFrame(this._animId);
    },

    _loadLine: function (index) {
        this._currentIndex = index;
        this._currentDuration = this._durations[index];
        this._currentLine = this._latlngs.slice(index, index + 2);
    },

    _updateLine: function (timestamp) {
        // time elapsed since the last latlng
        let elapsedTime = timestamp - this._startTimeStamp;

        // not enough time to update the line
        if (elapsedTime <= this._currentDuration) {
            return elapsedTime;
        }

        let lineIndex = this._currentIndex;
        let lineDuration = this._currentDuration;

        while (elapsedTime > lineDuration) {
            // substract time of the current line
            elapsedTime -= lineDuration;
            lineIndex++;

            // test if we have reached the end of the polyline
            if (lineIndex >= this._latlngs.length - 1) {
                // place the marker at the end, else it would be at
                // the last position
                this.setLatLng(this._latlngs[this._latlngs.length - 1]);
                this.stop();
                return null;
            }
            lineDuration = this._durations[lineIndex];
        }

        this._loadLine(lineIndex);
        this._startTimeStamp = timestamp - elapsedTime;
        this._startTime = Date.now() - elapsedTime;
        return elapsedTime;
    },

    _animate: function (timestamp) {
        // find the next line and compute the new elapsedTime
        let elapsedTime = this._updateLine(timestamp);

        if (this.isEnded()) return;

        if (elapsedTime != null) {
            // compute the position
            let p = interpolatePosition(
                this._currentLine[0],
                this._currentLine[1],
                this._currentDuration,
                elapsedTime
            );
            this.setLatLng(p);
        }

        this._animId = requestAnimationFrame(this._animate);
    }
});