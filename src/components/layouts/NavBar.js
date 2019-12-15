import React from "react";
import { Link } from "react-router-dom";
import SigninLinks from "./SigninLinks";
import SignoutLinks from "./SignoutLinks";
import { useSelector } from "react-redux";

const NavBar = () => {
  const auth = useSelector(state => state.firebase.auth);

  return (
    <nav className="nav-wrapper z-depth grey darken-3" style={{
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 999
    }}>
      <div className="container">
        <Link className="brand-logo" to="/">
          MARIO || PLAN
        </Link>
        <ul className="right menu">
          <div className="animated fadeIn fastest">
              {!auth.isEmpty ? <SigninLinks isVerified={auth.emailVerified} /> : <SignoutLinks />}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
