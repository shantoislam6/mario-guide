import { history } from "../history";
import { flash } from "../components/childs/FlashMessage";
// get autheticated or not
export default getState => {
  const redirectToLogin = (
    message = "You haven't Loggedin yet!!Please Login and try again!!"
  ) => {
    history.push("/signin");
    flash({
      type: "danger",
      message: message
    });
  };
  const auth = getState().firebase.auth;
  return {
    isAuthenticate: !auth.isEmpty,
    isVerified: auth.emailVerified,
    redirectToLogin,
    user: {
      uid: auth.uid,
      ...getState().firebase.profile
    }
  };
};
