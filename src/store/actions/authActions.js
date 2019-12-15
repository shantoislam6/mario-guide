import { history } from "../../history";
import { flash } from "../../components/childs/FlashMessage";

// Sign in action for existing users
export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getFirebase().auth();
    // pending request button loader
    dispatch({
      type: "ENABLE_BTN_SPINNER"
    });

    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(doc => {
        dispatch({
          type: "LOGIN_SUCCESS"
        });

        dispatch({
          type: "DISABLE_BTN_SPINNER"
        });

        let urlPath = "/";
        if (history.location.state) {
          const historyState = history.location.state;
          if (historyState.pathname === "/") {
            urlPath = "/" + historyState.search;
          } else {
            urlPath = historyState.pathname + historyState.search;
          }
        }
        history.push(urlPath);

        flash(
          {
            type: "success",
            message: "You Have Loggin In!!"
          },
          4000
        );
      })
      .catch(err => {
        dispatch({
          type: "LOGIN_ERROR",
          authMessage: err.message
        });
        dispatch({
          type: "DISABLE_BTN_SPINNER"
        });
        flash(
          {
            type: "danger",
            message: err.message
          },
          4000
        );
      });
  };
};

//signOut action
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getFirebase().auth();

    //Pending request for logout loader
    dispatch({
      type: "ENABLE_SCREEN_PRELOADER"
    });
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: "LOGGED_OUT"
        });
        dispatch({
          type: "DISABLE_SCREEN_PRELOADER"
        });
        flash({
          type: "success",
          message: "You have logged out!!"
        });

        setTimeout(() => {
          history.push("/user/signin");
        }, 400);
      })
      .catch(err => {
        dispatch({
          type: "DISABLE_SCREEN_PRELOADER"
        });
        flash({
          type: "danger",
          message: err.message
        });
      });
  };
};

export const signUp = signUpInfo => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    //Pending request for logout loader
    dispatch({
      type: "ENABLE_BTN_SPINNER"
    });
    auth
      .createUserWithEmailAndPassword(signUpInfo.email, signUpInfo.password)
      .then(() => {
        const user = getFirebase().auth().currentUser;
        user
          .updateProfile({
            displayName: signUpInfo.displayName,
            photoURL:
              "https://us.v-cdn.net/6031128/uploads/defaultavatar/p632NH0JSAC5C.jpg"
          })
          .then(function() {
            const createUser = getFirebase()
              .functions()
              .httpsCallable("createUser");
              createUser({
                displayName:signUpInfo.displayName,
                photoURL: "https://us.v-cdn.net/6031128/uploads/defaultavatar/p632NH0JSAC5C.jpg",
                uid: user.uid,
                providerId:null,
                email: signUpInfo.email,
                created_at: Date.now(),
                phoneNumber:null,
              })
              .then(() => {
                dispatch(emailVerifier());
              })
              .catch(err => {
                flash({
                  type: "danger",
                  message: err.message
                });
              });
          })
          .catch(err => {
            dispatch({
              type: "DISABLE_BTN_SPINNER"
            });
            dispatch({
              type: "LOGIN_ERROR",
              authMessage: err.message
            });
            flash({
              type: "danger",
              message: err.message
            });
          });
      })
      .catch(err => {
        dispatch({
          type: "DISABLE_BTN_SPINNER"
        });
        dispatch({
          type: "LOGIN_ERROR",
          authMessage: err.message
        });
        flash({
          type: "danger",
          message: err.message
        });
      });
  };
};

// Varify email
export const emailVerifier = (fromManually = false) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const currentUser = getFirebase().auth().currentUser;
    if (currentUser != null) {
      if (!currentUser.emailVerified) {
        dispatch({
          type: "ENABLE_BTN_SPINNER"
        });
        currentUser
          .sendEmailVerification()
          .then(() => {
            if (fromManually) {
              flash({
                type: "success",
                message: "The email verfication token has been sent!."
              });
              dispatch({
                type: "DISABLE_BTN_SPINNER"
              });
            } else {
              dispatch({
                type: "DISABLE_BTN_SPINNER"
              });
              history.push("/email/verify");
              flash(
                {
                  type: "success",
                  message:
                    "You are logged in as a new user, So, First Verify your email."
                },
                4000
              );
            }
          })
          .catch(err => {
            flash({
              type: "danger",
              message: err.message
            });
            dispatch({
              type: "DISABLE_BTN_SPINNER"
            });
          });
      } else {
        if (fromManually) {
          flash({
            type: "danger",
            message: "You have already verfied your email!!"
          });
        }
      }
    } else {
      if (fromManually) {
        flash({
          type: "danger",
          message: "You are not autheticated user!!"
        });
      }
    }
  };
};
