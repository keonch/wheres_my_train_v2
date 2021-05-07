import { connect } from 'react-redux';
import TrainMarker from '../components/TrainMarker';
import { getTrain } from '../reducers/selectors';
import { ICONS_BY_ROUTE } from '../assets/data/ICONS';

const msp = (state, ownProps) => {
    const train = getTrain(state, ownProps.trainId);
    return {
        train,
        icon: ICONS_BY_ROUTE[train.route]
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(TrainMarker);