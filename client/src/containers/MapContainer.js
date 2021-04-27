import { connect } from 'react-redux';
import Map from '../components/Map';
import { getVisibleTrains } from '../reducers/selectors';

const msp = (state, ownProps) => {
    return {
        trainIds: getVisibleTrains(state),
        trainsById: state.trains.trainsById
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Map);