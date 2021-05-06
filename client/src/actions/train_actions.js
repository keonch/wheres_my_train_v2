import { normalizeTrainData } from '../utils/normalize_data';
import { TRAIN_GROUPS_BY_ROUTE } from '../utils/constants';
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

const receiveTrains = (payload) => {
    return ({
        type: RECEIVE_TRAINS,
        trains: normalizeTrainData(payload.entity)
    });
};

const receiveErrors = (errors) => {
    return ({
        type: RECEIVE_TRAIN_ERRORS,
        errors
    });
};

export const fetchTrainsByRoute = (route) => (
    (dispatch) => (fetchTrainsAPI(TRAIN_GROUPS_BY_ROUTE[route]).then(
        (payload) => (dispatch(receiveTrains(payload))),
        (errors) => (dispatch(receiveErrors(errors)))
    ))
);