import React from 'react';
import { render } from 'react-dom';
import App from '@/view/App';
import { createStore ,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import sagas from '@/store/sagas'
import reducers from '@/store/reducers';

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
        ArrowUp:"Up",
        ArrowDown:"Down",
        ArrowRight:"Right",
        ArrowLeft:"Left"
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
