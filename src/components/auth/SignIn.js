import React from "react";
import useInput from "../hooks/useInput";
import { signIn } from "../../store/actions/authActions";
import { useDispatch } from "react-redux";
import { flash } from "../childs/FlashMessage";
import { SubmitButton } from "../childs/button";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [email] = useInput("");
  const [password] = useInput("");

  function signInHandler(e) {
    e.preventDefault();
    if (email.value !== "" && password.value !== "") {
      if (password.value.length > 5) {
        dispatch(
          signIn({
            email: email.value,
            password: password.value
          })
        );
      } else {
        flash(
          {
            type: "danger",
            message: "Password to be at least 6 characters"
          },
          4000
        );
      }
    } else {
      flash(
        {
          type: "danger",
          message: "All Fields Required!!"
        },
        4000
      );
    }
  }

  return (
    <div className="container">
      <div className="row">
        <form
          style={{ marginTop: "50px", padding: "30px" }}
          className="white offset-m2 offset-s0 col s12 m8 animated fadeIn faster"
          onSubmit={signInHandler}
        >
          <h3 className="grey-text center text-darken-3">Sign In</h3>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input placeholder="Email" {...email} type="email" id="email" />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">https</i>
            <input
              type="password"
              placeholder="password"
              {...password}
              id="password"
              autoComplete="true"
            />
          </div>
          <div className="input-field">
            <SubmitButton async={true} style={{ marginLeft: "45px" }}>
              Sign In
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
