import React from 'react';
import { render } from 'react-dom';
import App from '@/view/App';
import { Provider } from 'react-redux';
import {run,store} from "@/store"
import keydown from "@/view/listeners/keydown"

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);

keydown(window,store)

run();
store.dispatch({type:"REQUEST_INIT"})
