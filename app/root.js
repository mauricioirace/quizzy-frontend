import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
import store from './common/redux/store';
import setupConfig from './common/config';

setupConfig();

ReactDom.render(
    <Provider store={ store } >
        <App/>
    </Provider>,
    document.getElementById('app')
);
