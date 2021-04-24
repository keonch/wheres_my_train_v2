import { connect } from 'react-redux';
import { fetchTrains } from '../actions/train_actions';
import App from './App';

const msp = (state, ownProps) => {
    return ({});
};

const mdp = (dispatch) => {
    return ({
        fetchTrains: (trainGroup) => dispatch(fetchTrains(trainGroup))
    });
};

export default connect(msp, mdp)(App);