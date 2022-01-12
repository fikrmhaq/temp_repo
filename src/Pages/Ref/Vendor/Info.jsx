import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Services from '../../../services/Services';

class Info extends React.Component {
    state = {
        barang: null
    }

    componentDidMount() {
        Services.getBarang().then(res => {
            const barang = res.data.data.filter(item => item.id_vendor == this.props.data.id_vendor);
            const nama_barang = new Object();
            barang.forEach(item => {
                if (Object.keys(nama_barang).indexOf(item.nama_barang) < 0) nama_barang[item.nama_barang] = 0;
                nama_barang[item.nama_barang]++;
            })
            this.setState({ barang: nama_barang });
        })
    }

    render() { 
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} centered className='modal-info'>
                <ModalBody>
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title mt-auto">Info Vendor</h5>
                        <button className="btn" onClick={this.props.toggle}>&times;</button>
                    </div>
                    <p className='modal-subtitle'>Vendor &#9679; {this.props.data.nama}</p>
                    <h6 className='title-barang'>Barang Terkait</h6>
                    <div className='barang py-2'>
                        <ul className='m-0'>
                            {this.state.barang != null && Object.keys(this.state.barang).map(item => (
                                <li><div className='d-flex justify-content-between pe-3'><span>{item}</span><span>{this.state.barang[item]} Unit</span></div></li>
                            ))}
                        </ul>
                        {this.state.barang != null && Object.keys(this.state.barang).length == 0 && <span className='ms-3'>Empty</span>}
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default Info;