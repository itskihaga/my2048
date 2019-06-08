import * as React from 'react';
import Playing from '@/view/templates/Playing';
import CellSample from "@/view/templates/CellSample";
import { connect } from 'react-redux';
import { BrowserRouter, Route ,Switch } from 'react-router-dom'
import {AppState} from "@/domain/model/model"

const App = ({stage}:{stage:string}) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                {stage == "playing" ? <Playing/> : null}
            </Route>
            <Route exact path="/sample">
                <CellSample/>
            </Route>
        </Switch>
    </BrowserRouter>
)

export default connect((state:AppState) => state)(App)

