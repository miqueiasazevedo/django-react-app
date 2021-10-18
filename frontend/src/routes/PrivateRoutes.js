import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "../pages/Home";
import Page404 from "../pages/Page404";

function PrivateRoutes() {
  return (
    <BrowserRouter>
      <Redirect exact from='/login' to='home' />
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/*' component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default PrivateRoutes;
