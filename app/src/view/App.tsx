import * as React from 'react';
import Playing from '@/view/templates/Playing';
import CellSample from "@/view/templates/CellSample";
import { connect } from 'react-redux';
import { BrowserRouter, Route ,Switch } from 'react-router-dom'
import {AppState} from "@/domain/model/model"
import Landing from "@/view/container/Landing"
import css from "@/view/style.scss"

const App = ({stage}:{stage:string}) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <div className={css.center}>
                    {stage == "playing" ? <Playing/> : <Landing/>}
                </div>
            </Route>
            <Route exact path="/sample">
                <CellSample/>
            </Route>
        </Switch>
    </BrowserRouter>
)

export default connect((state:AppState) => state)(App)

