import Cleave from 'cleave.js/react';
import React from 'react';
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Services from '../../services/Services';

class TambahCore extends React.Component {
    state = {
        vendor: false,
        supplier: false,
        dataVendor: null,
        inputVendor: {
            nama: ''
        },
        dataSearchVendor: null,
        vendorActive: '',
        inputBarang: {
            nama_barang: '',
            id_vendor: ''
        },
        inputDetail: {
            nama_aset: '',
            spesifikasi: '',
            jumlah: 0,
            harga_satuan: 0,
            jenis_satuan: 1,
        }
    }

    componentDidMount() {
        Services.getVendor().then(res => {
            this.setState({ dataVendor: res.data, dataSearchVendor: res.data.data });
        });
        let vendor = this.props.data.vendor

        this.setState({ dataVendor: "NOT NULL", dataSearchVendor: vendor })
    }

    newVendor = () => {
        const error = [];
        Object.keys(this.state.inputVendor).forEach(item => {
            if (this.state.inputVendor[item] == '') error.push(item);
        })
        if (error.length > 0) {
            alert(`${error.join(', ')} are required!`)
            return;
        }
        Services.postVendor(this.state.inputVendor).then(res => {
            Services.getVendor().then(res => {
                this.setState({ dataVendor: res.data, dataSearchVendor: res.data.data }, () => {
                    this.setMessage({ message: 'Added', err: false })
                })
            })
        }).catch(err => {
            this.setMessage({ message: err, err: true })
        })

        
    }

    changeVendor = (key, value) => {
        this.state.inputVendor[key] = value;
        this.setState({ inputVendor: this.state.inputVendor })
    }

    vendorSearch = (e) => {
        this.setState({ dataSearchVendor: this.state.dataVendor.data.filter(item => item.nama.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) })
    }

    changeInput = (type, key, value) => {
        this.state[type][key] = value;
        this.setState({ [type]: this.state[type] });
    }

    render() { 
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.open} className="tambah-barang" centered>
                <ModalBody>
                    <div className="d-flex justify-content-between mb-2">
                        <h5 className='modal-title'>Tambah Aset</h5>
                        <button className="btn" onClick={this.props.toggle}>&times;</button>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="nama_barang">Nama Aset</label>
                        <input type="text" name="nama_barang" id="nama_barang" className="form-control" placeholder="Input nama barang disini" onChange={(e) => {this.changeInput('inputBarang', 'nama_barang', e.target.value)}} value={this.state.inputBarang.nama_barang} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="nama_aset">Tujuan Kontrak</label>
                        <input type="text" name="nama_aset" id="nama_aset" className="form-control" placeholder="Input tujuan kontrak disini" value={this.state.inputDetail.nama_aset} onChange={(e) => {this.changeInput('inputDetail', 'nama_aset', e.target.value)}} />
                    </div>
                    <div className="row mb-2">
                        <div className="form-group col-lg-6">
                            <label htmlFor="jumlah">Jumlah</label>
                            <Cleave options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} id='jumlah' className="form-control" placeholder="Input jumlah disini" value={this.state.inputDetail.jumlah} onChange={(e) => {this.changeInput('inputDetail', 'jumlah', e.target.rawValue)}}></Cleave>
                        </div>
                        <div className="form-group col-lg-6">
                            <label htmlFor="jenis_satuan">Jenis Satuan</label>
                            <select name="jenis_satuan" id="jenis_satuan" className="form-select" value={this.state.inputDetail.jenis_satuan} onChange={(e) => {this.changeInput('inputDetail', 'jnies_satuan', e.target.value)}}>
                                <option value="0">KG</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="harga_satuan">Harga Satuan</label>
                        <Cleave options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} className='form-control' id='harga_satuan' placeholder='Harga Satuan' value={this.state.inputDetail.harga_satuan} onChange={(e) => {this.changeInput('inputDetail', 'harga_satuan', e.target.rawValue)}}></Cleave>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="spesifikasi">Spesifikasi Barang</label>
                        <textarea name="spesifikasi" id="spesifikasi" cols="30" rows="3" className="form-control" placeholder="Input spesifikasi barang disini" onChange={(e) => {this.changeInput('inputDetail', 'spesifikasi', e.target.value)}}></textarea>
                    </div>
                    <div className="detail-container">
                        {/* vendor */}
                        <div className="d-flex justify-content-between">
                            <div className="mt-auto">
                                Vendor
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm" onClick={() => this.setState({ vendor: !this.state.vendor })}>+</button>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.vendor}>
                            <div className="d-flex pt-3">
                                <div className="form-group w-100">
                                    <input type="text" name="vendor" id="vendor" className="form-control" placeholder="Vendor" onChange={(e) => {this.changeVendor('nama', e.target.value)}} value={this.state.inputVendor.nama} />
                                </div>
                                <div>
                                    <button className="btn btn-primary ms-3 btn-sm" onClick={this.newVendor}><i class="fas fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </Collapse>
                        <div className="detail px-2 py-3 mt-3 rounded-3">
                            <div className="form-group">
                                <input type="text" name="search" id="search" className="form-control" placeholder="Search" onChange={this.vendorSearch} />
                            </div>
                            <ul className="nav flex-column mt-3 px-1">
                                {this.state.dataVendor != null ? (
                                   this.props.data.vendor.map(item => {
                                        return (
                                            <li className={"nav-item py-2 px-3 rounded-3 mb-2 " + (this.state.inputBarang.id_vendor == item.id_vendor && 'active')} onClick={() => {this.state.inputBarang.id_vendor = item.id_vendor;this.setState({ inputBarang: this.state.inputBarang })}}>
                                                {item.nama}
                                            </li>
                                        );
                                    })
                                ) : "Loading..."}
                            </ul>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary shadow-none" onClick={() => this.props.submit(this.state.inputBarang, this.state.inputDetail)}>Save</button>
                </ModalFooter>
            </Modal>
        );
    }
}
 
export default TambahCore;