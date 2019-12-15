import React from "react";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { flash } from "../childs/FlashMessage";
import { signUp } from "../../store/actions/authActions";
import { SubmitButton } from "../childs/button";
const Singup = () => {
  document.title = 'Sign Up - Mario Plan';
  const dispatch = useDispatch();
  const [firstName] = useInput("");
  const [lastName] = useInput("");
  const [email] = useInput("");
  const [password] = useInput("");
  const [confirmPassword] = useInput("");

  const signUpHandler = (e) =>{
    e.preventDefault();
    if (
      firstName.value !== "" &&
      lastName !== "" &&
      email.value !== "" &&
      password.value !== "" &&
      confirmPassword.value
    ) {
      if (password.value.length > 5) {
        if (password.value === confirmPassword.value) {
          dispatch(
            signUp({
              displayName: firstName.value + lastName.value,
              email: email.value,
              password: password.value,
              fullName: firstName.value + ' ' + lastName.value,
              initials: firstName.value[0] + lastName.value[0]
            })
          );
        } else {
          flash({
            type: "danger",
            message: "Password is not match to your confirm password!!"
          });
        }
      } else {
        flash({
          type: "danger",
          message: "Password Should be at least 6 characters!!"
        });
      }
    } else {
      flash({
        type: "danger",
        message: "All feilds are required!!"
      });
    }
  }

  return (
    <div className="container">
      <div className="row">
        <form
          onSubmit={signUpHandler}
          className="white offset-m2 offset-s0 col s12 m8 animated fadeIn faster"
          style={{ marginTop: "50px", padding: "30px" }}
        >
          <h3 className="grey-text center text-darken-3">Sign Up</h3>
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="firstname"
              {...firstName}
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="lastname"
              {...lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input placeholder="Email" {...email} type="email" id="email" />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">https</i>
            <input
              type="password"
              {...password}
              placeholder="password"
              id="password"
            />
          </div>

          <div className="input-field">
            <i className="material-icons prefix">https</i>
            <input
              type="password"
              {...confirmPassword}
              placeholder="Confirm Password"
              id="confirmpassword"
            />
          </div>
          <div className="input-field ">
             <SubmitButton async={true} style={{ marginLeft: "45px" }}>
              Sign In
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Singup;
