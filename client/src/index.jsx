import React from 'react';
import { render } from 'react-dom';
import App from '@/components/App';
import submit from '@/reducers/toggle';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@/style.scss';

const store = createStore(submit);

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);