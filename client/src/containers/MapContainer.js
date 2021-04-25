import { connect } from 'react-redux';
import Map from '../components/Map';
import { getVisibleTrains } from '../reducers/selectors';

const msp = (state, ownProps) => {
    return {
        trains: getVisibleTrains(state)
    };
};

const mdp = (dispatch) => {
    return {};
};

export default connect(msp, mdp)(Map);