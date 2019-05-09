import React from 'react';
import Start from '@/components/start/StartAdaptor';
import Playing from '@/components/playing/Playing';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link ,Switch } from 'react-router-dom'
import TransitionSample from '@/components/sample/TransitionSample'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {this.props.cells ? <Playing/> : <Start/>}
                    </Route>
                    <Route exact path="/sample1">
                        <TransitionSample />
                    </Route>
                </Switch>
                <Link to='/sample1'>sample1</Link>
            </BrowserRouter>
        )
    }
}



export default connect(state => state)(App);