import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import PrivateRoute from "./privateRoutes";

const routes = [
  { path: "/home", component: Home, exact: true, isPrivate: true },
  { path: "/login", component: Login, exact: true, isPrivate: false },
  { path: "/signup", component: Signup, exact: true, isPrivate: false },
];

export default function Routes() {
  return (
    <Switch>
      {routes.map((item, i) => {
        if (item.isPrivate) {
          return (
            <PrivateRoute
              key={i}
              path={item.path}
              exact={item.exact}
              component={(props) => <item.component />}
            />
          );
        }
        return (
          <Route
            key={i}
            path={item.path}
            exact={item.exact}
            component={(props) => <item.component />}
          />
        );
      })}
      <Redirect from="/" to={"/login"} />
    </Switch>
  );
}
