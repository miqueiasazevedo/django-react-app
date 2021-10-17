import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Page404 from "../pages/Page404";

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Redirect from='/' to='login' />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='*' component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default SignRoutes;
