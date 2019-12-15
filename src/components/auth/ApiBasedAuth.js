import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useFirebase } from "react-redux-firebase";

const ApiBasedAuth = () => {

  const firebase = useFirebase();
  
  // Configure FirebaseUI.
  const uiConfig = React.useRef({
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: () => false
    },
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ]
  });

  return (
    <StyledFirebaseAuth uiConfig={uiConfig.current} firebaseAuth={firebase.auth()} />
  );
};

export default ApiBasedAuth;
