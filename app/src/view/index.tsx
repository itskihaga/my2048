import * as React from 'react';
import { render } from 'react-dom';
import App from '@/view/App';
import { Provider } from 'react-redux';
import {Store} from "redux"

export default (elm:HTMLElement,store:Store) => {
    render(
        <Provider store={store}>
            <App />
        </Provider>, 
        elm
    );
}