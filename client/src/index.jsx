import React from 'react';
import { render } from 'react-dom';
import App from '@/components/App';
import reducers from '@/reducers';
import { createStore ,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import sagas from './saga'
import {DIRECTIONS} from "./domain/domains"
import '@/style.scss';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,{cells:[]},applyMiddleware(sagaMiddleware,logger));

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);

window.addEventListener("keydown",event=>{

    event.preventDefault();

    const dic = {
        ArrowUp:DIRECTIONS.Up,
        ArrowDown:DIRECTIONS.Down,
        ArrowRight:DIRECTIONS.Right,
        ArrowLeft:DIRECTIONS.Left
    }

    dic[event.key] && store.getState("cells").cells && 
    store.dispatch({
        type:"REQUEST_MOVE",
        cells:store.getState("cells").cells,
        token:store.getState("token").token,
        direction:dic[event.key]
    })
});

sagaMiddleware.run(sagas);
store.dispatch({type:"REQUEST_INIT"})
