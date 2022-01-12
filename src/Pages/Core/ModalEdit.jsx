import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalEdit extends React.Component {
    render() { 
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h5>Edit</h5>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="nama_barang">Nama Barang</label>
                            <input type="text" name="nama_barang" id="nama_barang" className="form-control" value={this.props.input.nama_barang} onChange={(e) => {this.props.setInput({ nama_barang: e.target.value })}} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary">Edit</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
 
export default ModalEdit;