import React from 'react';
import { connect } from 'react-redux';
import actions from '@/reducers/actions';
import Box from '@/components/Box';


class App extends React.Component {
    render() {
        return (
            <div onClick={this.props.toggle}>
                {this.props.flg ? "Hello React" : "Hello Redux"}
                <Box/>
            </div>
        );
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