import * as React from 'react';
import Playing from '@/view/templates/Playing';
import CellSample from "@/view/templates/CellSample";
import { connect } from 'react-redux';
import { BrowserRouter, Route ,Switch } from 'react-router-dom'
import {AppState} from "@/domain/model/model"

class App extends React.Component<AppState> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {this.props.stage == "playing" ? <Playing/> : null}
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