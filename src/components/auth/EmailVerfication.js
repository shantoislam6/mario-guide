import React from 'react';
import { emailVerifier } from '../../store/actions/authActions';
import { dispatch } from '../../providers/ReduxProvider';
import { SubmitButton } from '../childs/button';

const EmailVerfication = () => {
  const handleVerificantion = (e)=>{
    dispatch(emailVerifier(true));
  }
  return (
    <div className="container section project-details">
        <div className="card animated fadeIn faster">
          <div className="card-content">
            <h5>Please verify your email, And Go ahead :) </h5>
            <p>The email varification token has been sent to your email,<br/> <span className="grey-text darken-3">If you don't get email then click send again.</span></p>
            <br/>
            <SubmitButton onClick={handleVerificantion} async={true}><b>Send Again</b></SubmitButton>
          </div>
          </div>
    </div>
  )
}
export default EmailVerfication;
