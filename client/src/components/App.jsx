import React from 'react';
import { connect } from 'react-redux';
import Box from '@/components/Box';
import Start from '@/components/start/StartAdaptor';
import Controller from '@/components/controller/ControllerAdaptor';

class App extends React.Component {
    render() {
        if(!this.props.cells){
            return <Start/>
        }
        return (
            <div className="center">
                <Box cells={this.props.cells}/>
                <Controller/>
            </div>
        );
    }
}

const state2prop = state => {
    //TODO
    return state;
}

export default connect(state2prop)(App);