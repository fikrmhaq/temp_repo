import React, {memo} from "react";
import {
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useControllerState } from "../../../controllers/Ref";

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

const DeleteDialog = ({ open, toggle, nama, onSubmit }) => {



  const submit = () => {
      onSubmit()
      toggle()
  }

  return(
      <Modal 
      toggle={toggle}
       isOpen={open} className='modal-delete' centered>
              <ModalBody className='px-3'>
                  <h5 className="modal-title text-center">Konfirmasi</h5>
                  <p className='text-center'>Apakah anda yakin untuk menghapus</p>
                  <h5 className='text-center'>{nama}</h5>
                  <div className="row mt-4">
                      <div className="col-lg-6">
                          <button className="btn btn-secondary col-12" onClick={toggle}>Tidak</button>
                      </div>
                      <div className="col-lg-6">
                          <button className="btn btn-danger col-12" onClick={submit}>Hapus</button>
                      </div>
                  </div>
              </ModalBody>
          </Modal>
  )
}


export { Dialog, DeleteDialog };
