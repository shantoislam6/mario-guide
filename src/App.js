import React from "react";
import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { history } from "./history";
//import BrowserRouter Component
import NavBar from "./components/layouts/NavBar";

import GloablChildComponents from "./components/GloablChildComponents";
import ROOTPRELOADER from "./components/childs/Preloader/ROOTPRELOADER";
import Routes from "./routes";
import { Router } from "react-router-dom";

function App() {
  const auth = useSelector(state => state.firebase.auth);
  return (
    <React.Fragment>
      {isLoaded(auth) ? (
        <div className="animated fadeIn fastest">
          <Router history={history}>
            <NavBar />
            <GloablChildComponents />
            <div
              style={{
                marginTop: 60
              }}
            >
              <Routes />
            </div>
          </Router>
        </div>
      ) : (
        <ROOTPRELOADER />
      )}
    </React.Fragment>
  );
}

export default App;
