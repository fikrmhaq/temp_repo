import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

class DeleteModal extends React.Component {
    render() { 
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} className='modal-delete' centered>
                <ModalBody className='px-3'>
                    <h5 className="modal-title text-center">Konfirmasi</h5>
                    <p className='text-center'>{this.props.message}</p>
                    <h5 className='text-center'>{this.props.item}</h5>
                    <div className="row mt-4">
                        <div className="col-lg-6">
                            <button className="btn btn-secondary col-12" onClick={this.props.toggle}>Tidak</button>
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-danger col-12" onClick={this.props.submit}>Hapus</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default DeleteModal;