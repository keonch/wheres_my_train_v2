import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
export const RECEIVE_TRAINS = 'RECEIVE_TRAINS';
export const RECEIVE_TRAIN_ERRORS = 'RECEIVE_TRAIN_ERRORS';

const fetchTrainsAPI = (trainGroup) => (
    fetch(`/api/fetch_gtfs_feed/${trainGroup}`).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
);

const receiveTrains = (trainGroup, payload) => {
    return ({
        type: RECEIVE_TRAINS,
        [trainGroup]: payload.entity
    });
};

const receiveErrors = (errors) => {
    return ({
        type: RECEIVE_TRAIN_ERRORS,
        errors
    });
};

export const fetchTrains = (trainGroup) => (
    (dispatch) => (fetchTrainsAPI(trainGroup).then(
        (payload) => (dispatch(receiveTrains(trainGroup, payload))),
        (errors) => (dispatch(receiveErrors(errors)))
    ))
);