import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import NewsSandBox from "../views/NewsSandBox/NewsSandBox";
import Login from "../views/login/Login";

function indexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={NewsSandBox} /> */}
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <NewsSandBox></NewsSandBox>
            ) : (
              // 重定向跳转 Redirect
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </HashRouter>
  );
}

export default indexRouter;
