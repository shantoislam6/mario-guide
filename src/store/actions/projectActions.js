import { history } from "../../history";
import { flash } from "../../components/childs/FlashMessage";
import authInfo from "../../helpers/authInfo";

// unauthorized request handler
function authorizedHandler(uid1, uid2, executer) {
  if (uid1 === uid2) {
    executer();
  } else {
    flash({
      type: "danger",
      message: "Unathorized Request!!!"
    });
  }
}

// create project action
export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    const { profile } = getState().firebase;
    const db = getFirestore();
    const { isAuthenticate, redirectToLogin, user, isVerified } = authInfo(getState);
    if (isAuthenticate && isVerified) {
      //pending loader dispatch

      dispatch({
        type: "ENABLE_BTN_SPINNER"
      });

      db.collection("projects")
        .add({
          title: project.title,
          content: project.content,
          uid: user.uid,
          uFirstName: profile.firstName,
          uLastName: profile.lastName,
          created_at: Date.now(),
          updated_at: Date.now()
        })
        .then(() => {
          dispatch({
            type: "DISABLE_BTN_SPINNER"
          });
          flash({
            type: "success",
            message: "Project has been creadted successfully"
          });
          history.push("/dashboard");
        })
        .catch(err => {
          dispatch({
            type: "DISABLE_BTN_SPINNER"
          });
          flash({
            type: "danger",
            message: err.message
          });
        });
    } else {
      redirectToLogin();
    }
  };
};

//delete project
export const deleteProject = (id, uid) => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const { isAuthenticate, redirectToLogin, user, isVerified } = authInfo(getState);
    //pending loader dispatch
    if (isAuthenticate && isVerified) {
      //unauthorizer hanlder
      authorizedHandler(uid, user.uid, function() {
        dispatch({
          type: "ENABLE_SCREEN_PRELOADER"
        });
        db.collection("projects")
          .doc(id)
          .delete()
          .then(() => {
            dispatch({
              type: "DISABLE_SCREEN_PRELOADER"
            });
            flash({
              type: "success",
              message: "Project has been deleled successfully!!"
            });
         
          }).catch(err=>{
            dispatch({
              type: "DISABLE_SCREEN_PRELOADER"
            });
            flash({
              type: "danger",
              message: err.message,
            });
          })
      });
    } else {
      redirectToLogin();
    }
  };
};

// update project
export const updateProject = (id, uid, newProject) => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const { isAuthenticate, redirectToLogin, user, isVerified } = authInfo(getState);
    if (isAuthenticate && isVerified) {
      authorizedHandler(uid, user.uid, function() {
        //pending loader dispatch
        dispatch({
          type: "ENABLE_SCREEN_PRELOADER"
        });

        db.collection("projects")
          .doc(id)
          .set(newProject)
          .then(() => {
            dispatch({
              type: "DISABLE_SCREEN_PRELOADER"
            });
            history.push("/project/" + id);
            flash({
              type: "success",
              message: "The Project Has Been Upadated!!"
            });
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
      });
    } else {
      redirectToLogin();
    }
  };
};
