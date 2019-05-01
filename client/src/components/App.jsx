import React from 'react';
import { connect } from 'react-redux';
import actions from '@/reducers/actions'

class App extends React.Component {
    render() {
        return <div onClick={this.props.toggle}>
            {this.props.flg ? "Hello React" : "Hello Redux"}
        </div>;
    }
}

const state2prop = state => {
    //TODO
    return state;
}
const dispatch2prop = dispatch => {
    //TODO
    return {
        toggle() {
            dispatch({ type: actions.TOGGLE })
        }
    }
}

export default connect(state2prop, dispatch2prop)(App);