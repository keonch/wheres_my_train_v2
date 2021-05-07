import { connect } from 'react-redux';
import Controls from '../components/Controls';
import { fetchTrains } from '../actions/train';
import { activateRoute, deactivateRoute } from '../actions/ui';

const msp = ({ ui }, ownProps) => {
    return {
        activeRoutes: ui.activeRoutes,
        fetchedTimeStamps: ui.fetchedTimeStamps
    };
};

const mdp = (dispatch) => {
    return {
        fetchTrains: (trainGroup) => dispatch(fetchTrains(trainGroup)),
        activateRoute: (route) => dispatch(activateRoute(route)),
        deactivateRoute: (route) => dispatch(deactivateRoute(route))
    };
};

export default connect(msp, mdp)(Controls);