require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Application/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Application/redux/configureStore";
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './Application/utils/appTheme';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
