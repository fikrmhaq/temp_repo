import Cleave from 'cleave.js/react';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Services from '../../services/Services';

import { Toast } from '../../components';

class TambahRuangan extends React.Component {
    state = {
        dataInput: {
            nama_ruangan: '',
            penanggung_jawab: '',
            lantai: '',
            keterangan: ''
        },
        toast: {
            message: '',
            error: false
        }
    }

    changeSubmit = (key, value) => {
        this.state.dataInput[key] = value;
        this.setState({ dataInput: this.state.dataInput });
    }

    submit = () => {
        const error = [];
        Object.keys(this.state.dataInput).forEach(item => {
            if (this.state.dataInput[item] == '') error.push(item);
        })
        if (error.length) return window.alert(`${error.join(', ')} are required`);
        this.state.dataInput.keterangan = {
            keterangan: this.state.dataInput.keterangan
        }
        Services.postRuangan(this.state.dataInput).then(res => {
            this.state.toast = {
                message: 'Added',
                error: false
            }
            this.setState({ toast: this.state.toast }, () => {
                this.props.toggle();
                this.props.callback(res.data.data);
                setTimeout(() => {
                    this.state.toast = {
                        message: '',
                        error: false
                    }
                    this.setState({ toast: this.state.toast });
                }, 5000)
            })
        }).catch(err => {
            this.state.toast = {
                message: err,
                error: true
            }
            this.setState({ toast: this.state.toast }, () => {
                this.state.toast = {
                    message: '',
                    error: false
                }
                setTimeout(() => this.setState({  }), 5000);
            })
        })
    }

    render() {
        return (
            <>
                <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} centered>
                    <ModalBody>
                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="modal-title my-auto">Tambah Ruangan</h5>
                            <button className="btn" onClick={this.props.toggle}>&times;</button>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="nama_ruangan">Nama Ruangan</label>
                            <input type="text" name="nama_ruangan" id="nama_ruangan" className="form-control" placeholder='Input nama ruangan disini' value={this.state.dataInput.nama_ruangan} onChange={(e) => this.changeSubmit('nama_ruangan', e.target.value)} />
                        </div>
                        <div className="row mb-2">
                            <div className="form-group col-lg-7">
                                <label htmlFor="penanggung_jawab">Penanggung Jawab</label>
                                <input type="text" name="penanggung_jawab" id="penanggung_jawab" className="form-control" placeholder='Input penanggung jawab disini' value={this.state.dataInput.penanggung_jawab} onChange={(e) => this.changeSubmit('penanggung_jawab', e.target.value)} />
                            </div>
                            <div className="form-group col-lg-5">
                                <label htmlFor="penanggung_jawab">Lantai</label>
                                <Cleave options={{ numericOnly: true }} className='form-control' placeholder='Input lantai disini' value={this.state.dataInput.lantai} onChange={(e) => this.changeSubmit('lantai', e.target.rawValue)}></Cleave>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea name="keterangan" id="keterangan" rows="3" className="form-control" placeholder='Input keterangan disini' value={this.state.dataInput.keterangan} onChange={(e) => this.changeSubmit('keterangan', e.target.value)}></textarea>
                        </div>
                        <button className="btn btn-primary col-12 mt-3" onClick={this.submit}>Simpan</button>
                    </ModalBody>
                </Modal>
                <Toast message={this.state.toast.message} error={this.state.toast.error}></Toast>
            </>
        );
    }
}
 
export default TambahRuangan;