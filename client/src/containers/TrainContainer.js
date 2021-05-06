import { connect } from 'react-redux';
import Train from '../components/Train';
import { getTrain } from '../reducers/selectors';

const msp = (state, ownProps) => {
    return {
        train: getTrain(state.trains.trainsById, ownProps.trainId)
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Train);