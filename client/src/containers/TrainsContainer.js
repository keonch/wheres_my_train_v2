import { connect } from 'react-redux';
import Trains from '../components/Trains';
import { getVisibleTrains } from '../reducers/selectors';

const msp = (state, ownProps) => {
    return {
        trainIds: getVisibleTrains(state),
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Trains);