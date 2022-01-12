import React from 'react';

import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Services from '../../services/Services';
import Cleave from 'cleave.js/react';
import Toast from './Toast';

class TambahDokumen extends React.Component {
    state = {
        supplier: false,
        dataSupplier: null,
        dataSearchSupplier: null,
        supplierActive: '',
        inputSupplier: {
            nama_supplier: '',
            alamat: ''
        },
        jenisKontrak: null,
        sumberAnggaran: null,
        success: '',
        error: '',
    }

    componentDidMount() {
        Services.getSupplier().then(res => {
            this.setState({ dataSupplier: res.data.data, dataSearchSupplier: res.data.data })
        })
        Services.getJenisKontrak().then(res => {
            this.setState({ jenisKontrak: res.data.data });
        })
        Services.getAnggaran().then(res => {
            this.setState({ sumberAnggaran: res.data.data })
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

    setMessage = ({ message, err }) => {
        if (err) {
            this.setState({ error: message }, () => {
                setTimeout(() => {
                    this.setState({ error: '' })
                }, 5000)
            });
        }
        this.setState({ success: message }, () => {
            setTimeout(() => {
                this.setState({ success: '' })
            }, 5000)
        });
    }

    render() { 
        return (
            <div>
                <Modal toggle={this.props.toggle} isOpen={this.props.open} className="modal-tambah-dokumen" centered>
                    <ModalBody>
                        <div className="d-flex justify-content-between">
                            <h5 className="modal-title mb-2">Tambah Dokumen</h5>
                            <button className="btn" onClick={this.props.toggle}>&times;</button>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="nomor_kontrak">Nomor Dokumen</label>
                            {/* <input type="text" name="nomor_kontrak" id="nomor_kontrak" className="form-control" placeholder="Nomor Kontrak" value={this.props.input.nomor_kontrak} onChange={(e) => this.props.changeKontrak('nomor_kontrak', e.target.value)} /> */}
                            <Cleave options={{ numeral: true, numeralThousandsGroupStyle: true }} className="form-control" placeholder="Input nomor kontrak disini.." id="nomor_kontrak" onChange={(e) => this.props.changeKontrak('nomor_kontrak', e.target.value)}></Cleave>
                        </div>
                        <div className="row">
                            <div className="form-group mb-2 col-lg-6">
                                <label htmlFor="program">Jenis Dokumen</label>
                                {/* <input type="text" name="program" id="program" className="form-control" placeholder="Program" value={this.props.input.program} onChange={(e) => this.props.changeKontrak('program', e.target.value)} /> */}
                                <select name="id_jenis_kontrak" id="id_jenis_kontrak" className="form-select" onChange={(e) => {this.props.changeKontrak('id_jenis_kontrak', e.target.value)}}>
                                    {this.state.jenisKontrak != null ? (this.state.jenisKontrak.map(item => {
                                        return (
                                            <option value={item.id_jenis_kontrak}>{item.nama_jenis}</option>
                                        );
                                    })) : 'loading...'}
                                </select>
                            </div>
                            <div className="form-group mb-2 col-lg-6">
                                <label htmlFor="kegiatan">Sumber Anggaran</label>
                                <select name="id_sumber_anggaran" id="id_sumber_anggaran" className="form-select" onChange={(e) => {this.props.changeKontrak('id_sumber_anggaran', e.target.value)}}>
                                    {this.state.sumberAnggaran != null ? (this.state.sumberAnggaran.map(item => {
                                        return (
                                            <option value={item.id_sumber_anggaran}>{item.nama_sumber}</option>
                                        );
                                    })) : 'Loading...'}
                                </select>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="kode_rekening_kegiatan">Nomor BA</label>
                            <input type="text" name="kode_rekening_kegiatan" id="kode_rekening_kegiatan" className="form-control" placeholder="Input nilai kontrak disini.." value={this.props.input.ba_penerimaan_barang} onChange={(e) => this.props.changeKontrak('ba_penerimaan_barang', e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="form-group mb-2 col-lg-6">
                                <label htmlFor="total_anggaran">Tanggal BA</label>
                                <Cleave options={{ date: true, datePattern: ['d', 'm', 'Y'] }} className="form-control" placeholder="HH/BB/TTTT" onChange={(e) => {this.props.changeKontrak('tanggal_ba_penerimaan_barang', e.target.value.split('/').join('-'));console.log(e.target.value.split('/').join('-'))}}></Cleave>
                            </div>
                            <div className="form-group mb-2 col-lg-6">
                                <label htmlFor="tahun_anggaran">Nilai Kontrak</label>
                                <Cleave options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} className="form-control" placeholder="Input nilai kontrak disini.." onChange={(e) => {this.props.changeKontrak('nilai_kontrak', e.target.rawValue);}}></Cleave>
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
                                                <li className={"nav-item py-2 px-3 rounded-3 mb-2 " + (this.state.supplierActive == item.id_supplier && 'active')} onClick={() => {this.setState({ supplierActive: item.id_supplier }); this.props.changeKontrak('id_supplier', item.id_supplier)}}>
                                                    {item.nama_supplier}
                                                </li>
                                            );
                                        })
                                    ) : "Loading..."}
                                </ul>
                            </div>
                        </div>
                        <button className="btn btn-primary col-12 mt-3" onClick={() => {this.props.submit()}}>Submit</button>
                    </ModalBody>
                </Modal>
                <Toast message={this.state.error.length > 0 ? this.state.error : this.state.success} error={this.state.error.length > 0} toggle={() => {this.setState({ success: '', error: '' })}}></Toast>
            </div>
        );
    }
}
 
export default TambahDokumen;