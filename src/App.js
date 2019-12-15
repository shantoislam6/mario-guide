import React from "react";
import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { history } from "./history";
//import BrowserRouter Component
import NavBar from "./components/layouts/NavBar";
import { useFirebase } from "react-redux-firebase";
import GloablChildComponents from "./components/GloablChildComponents";
import ROOTPRELOADER from "./components/childs/Preloader/ROOTPRELOADER";
import Routes from "./routes";
import { Router } from "react-router-dom";
import { flash } from "./components/childs/FlashMessage";

function App() {
  const auth = useSelector(state => state.firebase.auth);
  const firebase = useFirebase();

  React.useEffect(() => {
    // auth listener
    firebase.auth().onAuthStateChanged(user => {
      const functions = firebase.functions();
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(snap => {
            if (!snap.exists && user.displayName != null) {
              const createUser = functions.httpsCallable("createUser");
              createUser({
                ...user.providerData[0],
                uid: user.uid,
                created_at: Date.now()
              })
                .then(result => {})
                .catch(err => {
                  flash({
                    type: "danger",
                    message: err.message
                  });
                });
            }
          })
          .catch(err => {
            flash({
              type: "danger",
              message: err.message
            });
          });
      }
    });
  }, []);

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
