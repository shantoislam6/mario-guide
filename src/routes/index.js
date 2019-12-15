import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// Components
import DashBoard from "../components/dashboard/Dashboard";
import ProjectDetails from "../components/projects/ProjectDetails";
import SignIn from "../components/auth/SignIn";
import Signup from "../components/auth/Singup";
import EmailVerfication from "../components/auth/EmailVerfication";
import CreateProject from "../components/projects/CreateProject";
import Test from "../components/Test";
import EditProject from "../components/projects/EditProject";
import { flash } from "../components/childs/FlashMessage";

const ProtectedRoute = ({
  isProtected,
  redirectPath,
  children,
 
  ...rest
}) => {

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isProtected ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: location
            }}
          />
        );
      }}
    />
  );
};

const Routes = () => {
  const auth = useSelector(state => state.firebase.auth);


  return (
    <React.Fragment>
      <Switch>
        {/*Public Routes*/}

        {/* If page not fond */}
        <Route path="/404">
          <div className="container">
            <h2 className="center grey-text text-darken-2">
              404!! Page Not Found!!
            </h2>
          </div>
        </Route>

        {/*For Test Something*/}
        <Route path="/test" component={Test} />

        {/*User Route*/}
        <ProtectedRoute
          isProtected={auth.isEmpty}
          redirectPath={"/"}
          path="/user"
        >
          <Switch>
            <Route path="/user/signin" component={SignIn} />
            <Route path="/user/signup" component={Signup} />
          </Switch>
        </ProtectedRoute>

        {/* Authenticate Route */}
        <ProtectedRoute
          isProtected={!auth.isEmpty}
          redirectPath="/user/signin"
          path="/"
        >
          <Switch>
            <ProtectedRoute
              path="/email/verify"
              isProtected={!auth.emailVerified && auth.phoneNumber === null}
              render={EmailVerfication}
            >
              <Route path="/email/verify" component={EmailVerfication} />
            </ProtectedRoute>

            <ProtectedRoute
              path="/"
              redirectPath="/email/verify"
              isProtected={auth.emailVerified || auth.phoneNumber !== null }
            >
              <Switch>
                <Redirect from="/" exact to="/dashboard" />
                <Route path="/dashboard" component={DashBoard} />
                <Route path="/project/:id" component={ProjectDetails} />
                <Route path="/newproject" component={CreateProject} />
                <Route path="/editproject/:id" component={EditProject} />
                <Route path="*">
                  <Redirect from="*" to="/404" />
                </Route>
              </Switch>
            </ProtectedRoute>
          </Switch>
        </ProtectedRoute>
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
