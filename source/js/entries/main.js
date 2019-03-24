import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainComponent from '../main/components/main-component';

const mainContainer = document.getElementById('boxes-container');

ReactDOM.render(
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainComponent}></Route>
                <Route exact path="/signin" component={MainComponent}></Route>
                <Route exact path="/signup" component={MainComponent}></Route>
            </Switch>
    </BrowserRouter>
    , mainContainer
);