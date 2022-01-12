import React from 'react';

import Cleave from 'cleave.js/react';
import { Collapse, Modal, ModalBody } from 'reactstrap';
import Services from '../../services/Services';

// Component
import { Toast } from '../../components';

class EditDokumen extends React.Component {
    constructor(props) {
        super(props);
        var iniProps = props.data;
        var iniProps2 = {...iniProps};
        this.state = {
            data: iniProps2,
            dokumen: null,
            sumberAnggaran: null,

            // Supplier
            supplier: false,
            dataSupplier: null,
            dataSearchSupplier: null,
            supplierActive: '',
            inputSupplier: {
                nama_supplier: '',
                alamat: ''
            },

            // Message
            message: {
                message: '',
                error: false
            }
        }
    }

    componentDidMount() {
        Services.getJenisKontrak().then(res => {
            this.setState({ dokumen: res.data.data });
        })
        Services.getAnggaran().then(res => {
            this.setState({ sumberAnggaran: res.data.data });
        })
        Services.getSupplier().then(res => {
            this.setState({ dataSupplier: res.data.data, dataSearchSupplier: res.data.data });
        })
    }

    changeSupplier = (key, value) => {
        this.state.inputSupplier[key] = value;
        this.setState({ inputSupplier: this.state.inputSupplier });
    }

    newSupplier = () => {
        const error = [];
        Object.keys(this.state.inputSupplier).forEach(item => {
            if (this.state.inputSupplier[item] == '') error.push(item)
        })
        if (error.length > 0) {
            alert(`${error.join(', ')} are required!`)
            return;
        }
        Services.postSupplier(this.state.inputSupplier).then(res => {
            Services.getSupplier().then(res => {
                this.setState({ dataSupplier: res.data, dataSearchSupplier: res.data.data }, () => {
                    this.setMessage({ message: 'Added', err: false });
                })
            }).catch(err => {
                this.setMessage({ message: err, err: true })
            })
        })
    }

    supplierSearch = (e) => {
        this.setState({ dataSearchSupplier: this.state.dataSupplier.filter(item => item.nama_supplier.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)})
    }

    /**
     * Ini adalah function untuk mengirim pesan ke Toast
     * @param {String} message Parameter yang digunakan untuk mengirim pesan ke Toast
     * @param {Boolean} [error=false] Parameter yang digunakan untuk mengirim error ke Toast
     */
    setMessage = (message, error = false) => {
        this.setState({ message: { message, error } }, () => {
            setTimeout(() => this.setState({ message: { message: '', error: false } }), 5000)
        })
    }

    changeKontrak = (key, value) => {
        this.state.data[key] = value;
        this.setState({ data: this.state.data });
    }

    submit = () => {
        const error = [];
        Object.keys(this.state.data).forEach(item => {
            if (this.state.data[item] == '' || this.state.data[item] == 0) error.push(item)
        })
        if (error.length > 0) return alert(`${error.join(', ')} are required!`);
        if (this.state.data.tanggal_ba_penerimaan_barang.split('-').join('').length < 8) return alert('Tanggal BA less than 8!');
        Services.patchKontrak(this.props.data.id_kontrak, this.state.data).then(res => {
            this.setMessage('Changed');
            this.props.refreshEdit();
            this.props.toggle();
        }).catch(err => {
            this.setMessage(err, true);
        })
    }

    render() { 
        return (
            <>
                <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} centered>
                    <ModalBody>
                        <div className="d-flex justify-content-between">
                            <h5 className="modal-title mt-auto">Ubah Dokumen</h5>
                            <button className="btn my-auto" onClick={this.props.toggle}>&times;</button>
                        </div>
                        <p className='m-0 mb-3'>Kontrak &#9679; {this.props.data.nomor_kontrak}</p>
                        <div className="form-group mb-2">
                            <label htmlFor="nomor_kontrak">Nomor Dokumen</label>
                            <input type="text" name="nomor_kontrak" id="nomor_kontrak" className="form-control" placeholder='Input nomor kontrak disini' value={this.state.data.nomor_kontrak} onChange={(e) => this.changeKontrak(e.target.name, e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 mb-2">
                                <label htmlFor="id_jenis_kontrak">Jenis Dokumen</label>
                                <select name="id_jenis_kontrak" id="id_jenis_kontrak" className="form-select" value={this.state.data.id_jenis_kontrak} onChange={(e) => this.changeKontrak(e.target.name, e.target.value)}>
                                    {this.state.dokumen != null ? this.state.dokumen.map(item => (
                                        <option value={item.id_jenis_kontrak}>{item.nama_jenis}</option>
                                    )) : (
                                        <option value="0">Loading...</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-lg-6 mb-2">
                                <label htmlFor="id_sumber_anggaran">Sumber Anggaran</label>
                                <select name="id_sumber_anggaran" id="id_sumber_anggaran" className="form-select" value={this.state.data.id_sumber_anggaran} onChange={(e) => this.changeKontrak(e.target.name, e.target.value)}>
                                    {this.state.sumberAnggaran != null ? this.state.sumberAnggaran.map(item => (
                                        <option value={item.id_sumber_anggaran}>{item.nama_sumber}</option>
                                    )): (
                                        <option value="0">Loading...</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="ba_penerimaan_barang">Nomor BA</label>
                            <input type="text" name="ba_penerimaan_barang" id="ba_penerimaan_barang" className="form-control" value={this.state.data.ba_penerimaan_barang} placeholder='Input nomor BA penerimaan barang disini' onChange={(e) => this.changeKontrak(e.target.name, e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 mb-2">
                                <label htmlFor="tanggal_ba_penerimaan_barang">Tanggal BA</label>
                                <Cleave options={{ date: true, datePattern: ['d', 'm', 'Y'] }} name='tanggal_ba_penerimaan_barang' className='form-control' placeholder='HH/BB/TTTT' value={this.state.data.tanggal_ba_penerimaan_barang.split('-').reverse().join('/')} onChange={(e) => this.changeKontrak(e.target.name, e.target.value.split('/').reverse().join('-'))}></Cleave>
                            </div>
                            <div className="form-group col-lg-6 mb-2">
                                <label htmlFor="nilai_kontrak">Nilai Kontrak</label>
                                <Cleave options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} name='nilai_kontrak' className='form-control' placeholder='Input nilai kontrak disini' value={this.state.data.nilai_kontrak} onChange={(e) => this.changeKontrak(e.target.name, e.target.rawValue)}></Cleave>
                            </div>
                        </div>
                        {/* Supplier */}
                        <div className="d-flex justify-content-between">
                            <div className="mt-auto">
                                Supplier
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm" onClick={() => this.setState({ supplier: !this.state.supplier })}>+</button>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.supplier}>
                            <div className="d-flex pt-3">
                                <div className="form-group w-100">
                                    <input type="text" name="vendor" id="vendor" className="form-control" placeholder="Supplier" onChange={(e) => {this.changeSupplier('nama_supplier', e.target.value)}} value={this.state.inputSupplier.nama_supplier} />
                                </div>
                                <div>
                                    <button className="btn btn-primary ms-3 btn-sm" onClick={this.newSupplier}><i class="fas fa-paper-plane"></i></button>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <textarea name="alamat" id="alamat" cols="30" rows="3" className="form-control" placeholder="Alamat" onChange={(e) => this.changeSupplier('alamat', e.target.value)} value={this.state.inputSupplier.alamat}></textarea>
                            </div>
                        </Collapse>
                        <div className="detail-container mb-2">
                            <div className="detail px-2 py-3 mt-3 rounded-3">
                                <div className="form-group">
                                    <input type="text" name="search" id="search" className="form-control" placeholder="Search" onChange={this.supplierSearch} />
                                </div>
                                <ul className="nav flex-column mt-3 px-1">
                                    {this.state.dataSupplier != null ? (
                                        this.state.dataSearchSupplier.map(item => {
                                            return (
                                                <li className={"nav-item py-2 px-3 rounded-3 mb-2 " + (this.state.data.id_supplier == item.id_supplier && 'active')} onClick={() => {this.setState({ supplierActive: item.id_supplier }); this.changeKontrak('id_supplier', item.id_supplier)}}>
                                                    {item.nama_supplier}
                                                </li>
                                            );
                                        })
                                    ) : "Loading..."}
                                </ul>
                            </div>
                        </div>
                        <button className="btn btn-primary col-12" onClick={this.submit}>Simpan</button>
                    </ModalBody>
                </Modal>
                <Toast message={this.state.message.message} error={this.state.message.error}></Toast>
            </>
        );
    }
}
 
export default EditDokumen;