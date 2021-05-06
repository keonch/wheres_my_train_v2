import { connect } from 'react-redux';
import Controls from '../components/Controls';
import { fetchTrainsByRoute } from '../actions/train_actions';
import { activateRoute, deactivateRoute } from '../actions/ui_actions';

const msp = ({ ui }, ownProps) => {
    return {
        activeRoutes: ui.activeRoutes
    };
};

const mdp = (dispatch) => {
    return {
        fetchTrain: (route) => dispatch(fetchTrainsByRoute(route)),
        activateRoute: (route) => dispatch(activateRoute(route)),
        deactivateRoute: (route) => dispatch(deactivateRoute(route))
    };
};

export default connect(msp, mdp)(Controls);