import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Toast } from '../../../components';
import Services from '../../../services/Services';

class EditVendor extends React.Component {
    constructor(props) {
        super(props);
        var data = props.data;
        var data1 = {...data};
        this.state = {
            data: data1,
            message: {
                message: '',
                error: false
            }
        }
    }

    changeData = (key, value) => {
        this.state.data[key] = value;
        this.setState({ data: this.state.data });
    }

    submit = () => {
        const error = [];
        Object.keys(this.state.data).forEach(item => {
            if (this.state.data[item] == '') error.push(item);
        })
        if (!error.length) return alert(`${error.join(', ')} are required!`);
        
    }

    

    render() { 
        return (
            <>
                <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} centered>
                    <ModalBody>
                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="modal-title">Ubah Vendor</h5>
                            <button className="btn" onClick={this.props.toggle}>&times;</button>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="nama">Nama Vendor</label>
                            <input type="text" name="nama" id="nama" className="form-control" placeholder='Input nama vendor disini' value={this.state.data.nama} onChange={(e) => this.changeData(e.target.name, e.target.value)} />
                        </div>
                        <button className="btn btn-primary col-12 mt-3" onClick={this.submit}>Simpan</button>
                    </ModalBody>
                </Modal>
                <Toast message={this.state.message.message} error={this.state.message.error} />
            </>
        );
    }
}
 
export default EditVendor;