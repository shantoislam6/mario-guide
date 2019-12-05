import React from 'react';
import "./index.css";
import { connect } from 'react-redux';


class Alert extends React.Component{
  constructor(props){
    super(props);
    this.isUnMounted = false;
    this.durationHanlder = null;
  }

  componentWillUnmount(){
    clearTimeout(this.durationHanlder);
  }

  componentDidMount(){
    this.isUnMounted = false;
    this.durationHanlder = setTimeout(() => {
      if(!this.isUnMounted){
        this.props.dismises();
      }
    }, this.props.duration);
  }

  render(){
    const props = this.props;
    return (
      <div className="alert-container" >
      <div className={`alert animated  bounceIn fastest alert-${ props.type}`}>
        <span className="alert-message">{props.children}</span>
        <button onClick = {()=>{props.dismises()}} className="alert-close">x</button>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dismises : () => dispatch({ type:'DISMISS_FLASH'})
  }
}

export default connect(null, mapDispatchToProps)(Alert);
