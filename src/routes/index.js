import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "../pages/main";
import Detail from "../pages/detail";

const router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/detail/:id" exact>
          <Detail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default router;
