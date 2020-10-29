import React from "react";
import "./Modal.css";

class Modal extends React.Component {
   render() {
      if (!this.props.isOpen) {
         return null;
      }
      return <div className="modal">{this.props.children}</div>;
   }
}
export default Modal;
