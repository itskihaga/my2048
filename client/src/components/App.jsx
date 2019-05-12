import React from 'react';
import Start from '@/components/start/StartAdaptor';
import Playing from '@/components/playing/Playing';
import { connect } from 'react-redux';
import { BrowserRouter, Route ,Switch } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {this.props.cells ? <Playing/> : <Start/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default connect(state => state)(App);