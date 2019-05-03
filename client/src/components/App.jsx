import React from 'react';
import Box from '@/components/box/BoxAdaptor';
import Start from '@/components/start/StartAdaptor';
import Controller from '@/components/controller/ControllerAdaptor';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        if(!this.props.cells){
            return <Start/>
        }
        return (
            <div className="center">
                <Box/>
                <Controller/>
            </div>
        );
    }
}



export default connect(state => state)(App);