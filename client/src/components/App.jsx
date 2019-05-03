import React from 'react';
import Start from '@/components/start/StartAdaptor';
import Playing from '@/components/playing/Playing';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return this.props.cells ? <Playing/> : <Start/>
    }
}



export default connect(state => state)(App);