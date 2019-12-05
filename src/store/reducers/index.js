import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import flashReducer from './flashReducer';
import loaderReducer from './loaderReducer';
import locationReducer from './locationReducer';

// Firebase reducers
const FireBaseReducer = {
  firebase: firebaseReducer,
  firestore: firestoreReducer
};

//custome reducers
const customeReducers = {
  authState: authReducer,
  projectState: projectReducer,
  flashState : flashReducer,
  loaderState : loaderReducer,
  locationState: locationReducer,
};
const rootReducer = combineReducers({
  ...customeReducers,
  ...FireBaseReducer
});

export default rootReducer;
