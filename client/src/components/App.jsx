import React from 'react';
import Playing from '@/components/playing/Playing';
import CellSample from "@/components/sample/CellSample"
import { connect } from 'react-redux';
import { BrowserRouter, Route ,Switch } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Playing/>
                    </Route>
                    <Route exact path="/sample">
                        <CellSample/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default connect(state => state)(App);