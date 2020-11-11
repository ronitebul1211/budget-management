import React from "react";
import "./Modal.css";

/**
 * Pass in a child component and place it in the center of the modal
 */
const Modal = ({ children }) => {
   return <div className="modal">{children}</div>;
};
export default Modal;
