import Cleave from 'cleave.js/react';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Services from '../../services/Services';

class ModalEdit extends React.Component {
    /**
     * 
     * @param {Object} props
     * @param {Object} props.data
     * @param {String} props.data.nama_ruangan
     * @param {String} props.data.penanggung_jawab
     * @param {number} props.data.lantai
     * @param {Object} props.data.keterangan
     * @param {String} props.data.keterangan.keterangan
     */
    constructor(props) {
        super(props)
        var data = props.data;
        delete data.soft_delete;
        delete data.updater_id;
        data = {...data};
        if (data.keterangan != null) data.keterangan = JSON.parse(data.keterangan).keterangan;
        this.state = {
            data: data,
        }
    }

    /**
     * 
     * @param {String} key Ini adalah paramater untuk menentukan key dari object data
     * @param {*} value Ini adalah parameter untuk memasukkan nilai ke object data
     */
    changeEdit = (key, value) => {
        this.state.data[key] = value;
        this.setState({ data: this.state.data });
    }

    /**
     * Ini adalah function untuk mengirim data edit ke API
     */
    submit = () => {
        const error = [];
        Object.keys(this.state.data).forEach(item => {
            if (this.state.data[item] == '' || this.state.data[item] == null) error.push(item);
        })
        if (error.length > 0) return alert(`${error.join(', ')} are required!`);
        var data = {...this.state.data};
        data.keterangan = {
            keterangan: data.keterangan
        }
        Services.patchRuangan(this.props.data.id_ruangan, data).then(res => {
            this.props.message('Changed');
            this.props.refresh();
            this.props.toggle();
        }).catch(err => {
            this.props.message(err, true);
        })
    }

    render() { 
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} centered>
                <ModalBody>
                    <div className="d-flex justify-content-between mb-3">
                        <h5 className="modal-title">Ubah Ruangan</h5>
                        <button className="btn" onClick={this.props.toggle}>&times;</button>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="nama_ruangan">Nama Ruangan</label>
                        <input type="text" name="nama_ruangan" id="nama_ruangan" className="form-control" placeholder='Input nama ruangan disini' value={this.state.data.nama_ruangan} onChange={(e) => this.changeEdit(e.target.name, e.target.value)} />
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-7 mb-3">
                            <label htmlFor="penanggung_jawab">Penanggung Jawab</label>
                            <input type="text" name="penanggung_jawab" id="penanggung_jawab" className="form-control" placeholder='Input nama penanggung jawab' value={this.state.data.penanggung_jawab} onChange={(e) => this.changeEdit(e.target.name, e.target.value)} />
                        </div>
                        <div className="form-group col-lg-5 mb-3">
                            <label htmlFor="lantai">Lantai</label>
                            <Cleave options={{ numericOnly: true }} className='form-control' placeholder='Input lantai disini' value={this.state.data.lantai} onChange={(e) => this.changeEdit(e.target.name, e.target.value)}></Cleave>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="keterangan">Keterangan</label>
                        <textarea name="keterangan" id="keterangan" rows="3" className="form-control" placeholder='Input keterangan disini' value={this.state.data.keterangan} onChange={(e) => this.changeEdit(e.target.name, e.target.value)}></textarea>
                    </div>
                    <button className="btn btn-primary col-12" onClick={this.submit}>Simpan</button>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default ModalEdit;