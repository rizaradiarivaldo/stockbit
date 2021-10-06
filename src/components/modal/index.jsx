import React from "react";
import { Modal, Image } from "react-bootstrap";
const ModalComp = (props) => {
  const { show, handleClose, poster } = props.data;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Image src={poster} fluid />
      </Modal.Body>
    </Modal>
  );
};
export default ModalComp;
