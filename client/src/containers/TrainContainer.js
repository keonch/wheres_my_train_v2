import { connect } from 'react-redux';
import Train from '../components/Train';
import { getTimeIntervals, getStations, getTrain } from '../reducers/selectors';
import ICONS_BY_ROUTE from '../utils/icons';

const msp = (state, ownProps) => {
    const train = getTrain(state, ownProps.id);
    const icon = ICONS_BY_ROUTE[train.route];
    return {
        train,
        icon,
        timeIntervals: getTimeIntervals(state, ownProps.id),
        stations: getStations(state, ownProps.id)
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Train);