import React from "react";
import Notification from "./Notification";
import ProjectList from "../projects/ProjectList";
import MyProjects from "../projects/MyProjects";
import { Route, Switch, Redirect } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container dashboard" >
      <div className="row">
        <div className="col s12 m6">
          <Switch>
            <Route path="/dashboard" exact>
              <ProjectList />
            </Route>
            <Route path="/dashboard/myprojects">
              <MyProjects/>
            </Route>
            <Route path="*">
              <Redirect from="*" to="/404" />
            </Route>
          </Switch>
        </div>
        <div className="div col s12 m5 offset-m1">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
