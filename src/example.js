import React from "react";
import Search from "./Search"
import { Route, Switch, Redirect } from 'react-router-dom';


export default function BasicExample() {
  return (
      <div>
        <Switch>
          <Route exact path="/metaData/:id" component={Search} />
          <Redirect to="/metaData" />
        </Switch>
      </div>
  );
}
