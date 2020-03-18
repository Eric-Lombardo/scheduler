import React from "react";
import classNames from "classnames";

import "components/Button.scss";

function Button(props) {

   // build css style string with 3rd party dependency 'classname'
   let buttonClass = classNames({
      button: true,
      'button--confirm': props.confirm,
      'button--danger': props.danger
   })

   return (
      <button 
         className={buttonClass} 
         onClick={props.onClick} 
         disabled={props.disabled}>
            {props.children}
      </button>
   )
}

export default Button