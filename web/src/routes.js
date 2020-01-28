import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Chat from './pages/chat';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/chat/" component={Chat} />
        </Switch>
    </BrowserRouter>
);

export default Routes;