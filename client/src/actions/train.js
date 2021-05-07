import { normalizeTrainData } from '../utils/normalization';
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

const receiveTrains = (payload, trainGroup) => {
    const trains = normalizeTrainData(payload.entity)
    return ({
        type: RECEIVE_TRAINS,
        trainsById: trains.trainsById,
        trainsByRoute: trains.trainsByRoute,
        trainGroup
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
        (payload) => (dispatch(receiveTrains(payload, trainGroup))),
        (errors) => (dispatch(receiveErrors(errors)))
    ))
);