import { connect } from 'react-redux';
import Train from '../components/Train';
import { getTimeIntervals, getStations, getTrain } from '../reducers/selectors';

const msp = (state, ownProps) => {
    return {
        train: getTrain(state, ownProps.id),
        timeIntervals: getTimeIntervals(state, ownProps.id),
        stations: getStations(state, ownProps.id)
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Train);