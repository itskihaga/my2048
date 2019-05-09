import React from 'react';
import Start from '@/components/start/StartAdaptor';
import Playing from '@/components/playing/Playing';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link ,Switch } from 'react-router-dom'
import TransitionSample from '@/components/sample/TransitionSample'
import TransitionSample2 from '@/components/sample/TransitionSample2'

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
                    <Route exact path="/sample2">
                        <TransitionSample2 />
                    </Route>
                </Switch>
                <Link to='/sample1'>sample1</Link>
            </BrowserRouter>
        )
    }
}



export default connect(state => state)(App);