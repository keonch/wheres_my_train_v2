import { connect } from 'react-redux';
import Train from '../components/Train';
import { getTrain } from '../reducers/selectors';
import { ICONS_BY_ROUTE } from '../assets/data/ICONS';

const msp = (state, ownProps) => {
    const train = getTrain(state.trains.trainsById, ownProps.trainId)
    return {
        train: train,
        icon: ICONS_BY_ROUTE[train.route]
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Train);