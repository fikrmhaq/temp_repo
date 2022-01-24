import React from "react";
import {
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Dialog = ({ open, title, children }) => {
  return (
    <Modal
      {...{ isOpen: open, fullscreen: "lg" }}
      style={{ maxWidth: "1000px", width: "100%" }}
    >
      <ModalBody>
        <div class="row" style={{ width: "100%" }}>
          <div class="col">{title}</div>
          <div class="col text-end">Close</div>
        </div>
        {children}
      </ModalBody>
    </Modal>
  );
};

export { Dialog };
