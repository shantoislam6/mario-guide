import React from 'react';
import {NavLink} from 'react-router-dom';

const SignoutLinks = () => {
  return (
    <React.Fragment>
      <li><NavLink to="/user/signin">Sign In</NavLink></li>
      <li><NavLink to="/user/signup">Sign Up</NavLink></li>
    </React.Fragment>
  );
}
export default SignoutLinks;
