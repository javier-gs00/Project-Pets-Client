import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchContainer from './Search/SearchContainer';

const Routes = () => (
    <Switch>
        <Route exact path='/search' component={SearchContainer} />
    </Switch>
)

export default Routes