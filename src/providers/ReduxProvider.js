import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../store/reducers";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore
} from "redux-firestore";
import firebase from "../config/fbcofig";

// create compose enhancers
let composeEnhancers;
if (process.env.NODE_ENV === "development") {
  composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
} else {
  composeEnhancers = compose;
}

//Create redux store
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore
      })
    ),
    reduxFirestore(firebase)
  )
);

// React Redux firebase props
const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

function ReduxProvider(props) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {props.children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export const dispatch = store.dispatch;
export const Store = store;
export default ReduxProvider;
