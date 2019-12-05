import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signOut } from "../../store/actions/authActions";

const SigninLinks = ({profile, isVerified}) => {
  const dispatch = useDispatch();
  const logouthandler = (e)=>{
    e.preventDefault();
    dispatch(signOut());
  }
  let protectedLinks = '';
  if(isVerified){
    protectedLinks = (
      <React.Fragment>
          <li><NavLink to="/dashboard" strict exact >Home</NavLink></li>
          <li><NavLink to="/dashboard/myprojects">My Projects</NavLink></li>
          <li><NavLink to="/newproject">New Project</NavLink></li>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
        {protectedLinks}
        <li><a onClick={logouthandler} href="/">Log Out</a></li>
        <li><NavLink to="/" className="btn btn-floating pink lighten-1"><b style={{textTransform:'uppercase'}}>{profile.initials}</b></NavLink></li>
    </React.Fragment>
  );
};

export default SigninLinks;
