import React from 'react';
import { Collapse, Modal, ModalBody } from 'reactstrap';
import Services from '../../services/Services';
import { Form } from '../components/Form/Form';
import { KategoriBarang, Vendor } from './components';

class EditCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVendor: null,
            inputVendor: {
                nama: ''
            },
            input: {

                unit:''
            },
            unit:false,
            unit_list:[],
            rincian_asset: [],
            history_id: [],
            lapisan: 0
        }
    }

    componentDidMount() {
        Services.getVendor().then(res => {
            this.setState({ dataVendor: res.data, dataSearchVendor: res.data.data });
        });
        Services.getRincian(100000000000).then(res => {
            this.state.rincian_asset.push(res.data.data);
            this.state.history_id.push((100000000000).toString());
            this.setState({ rincian_asset: this.state.rincian_asset, history_id: this.state.history_id, lapisan: this.state.lapisan + 1 });
        })

        console.log(this.props.data)
    }

    vendorSearch = (e) => {
        this.setState({ dataSearchVendor: this.state.dataVendor.data.filter(item => item.nama.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) })
    }

    changeVendor = (key, value) => {
        this.state.inputVendor[key] = value;
        this.setState({ inputVendor: this.state.inputVendor });
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

    nextLapisan = (mst_rincian, index) => {
        if (this.state.history_id[index] == mst_rincian) {
            this.state.history_id = this.state.history_id.filter((item, index1) => {
                return index1 < index;
            })
            this.state.rincian_asset = this.state.rincian_asset.filter((item, index1) => {
                return index1 < index;
            })
            this.setState({ rincian_asset: this.state.rincian_asset, history_id: this.state.history_id }, () => {
                this.props.changeData('id_rincian_asset', this.state.history_id[this.state.history_id.length - 1]);
            });
            return;
        }
        Services.getRincian(mst_rincian).then(res => {
            this.state.rincian_asset[index] = res.data.data;
            this.state.history_id[index] = mst_rincian;
            this.setState({ rincian_asset: this.state.rincian_asset, history_id: this.state.history_id }, () => {
                this.props.changeData('id_rincian_asset', this.state.history_id[this.state.history_id.length - 1]);
            });
        })
    }

    render() { 
        const { input, unit_list } = this.state
        return (
            <Modal size='lg' toggle={this.props.toggle} isOpen={this.props.isOpen} className='edit-core' centered>
                <ModalBody>
                    <div className="d-flex mb-2 justify-content-between">
                        <h5 className='modal-title my-auto'>Edit Barang</h5>
                        <button className="btn" onClick={this.props.toggle}>&times;</button>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="nama_barang">Nama Barang</label>
                        <input type="text" name="nama_barang" id="nama_barang" className="form-control" placeholder='Input nama barang disini' value={this.props.data.nama_barang} onChange={(e) => {this.props.changeData('nama_barang', e.target.value)}} />
                    </div>

                    {/* vendor */}
                    <div className="detail-container mb-2">
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
                        <Vendor dataVendor={
                            this.state.dataVendor != null ?
                            this.state.dataVendor
                            :
                            []
                        } dataSearchVendor={this.state.dataSearchVendor} id_vendor={this.props.data.id_vendor} onChange={(id) =>this.props.changeData('id_vendor', id)} />
                    </div>
                    <div className="detail-container mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="mt-auto">
                                Unit
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm" onClick={() => this.setState({ unit: !this.state.unit })}>+</button>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.unit}>
                            <div className="d-flex pt-3">
                                <div className="form-group w-100">
                                    <input type="text" name="Unit" id="vendor" className="form-control" placeholder="Unit" onChange={(e) => this.setState({ input: {...input, unit: e.target.value} })} value={input.unit} />
                                </div>
                                <div>
                                    <button className="btn btn-primary ms-3 btn-sm" 
                                    onClick={() => this.setState({ unit_list: [...unit_list, { nama:input.unit, 
                                        id_detail_kontrak: this.props.data.id_detail_kontrak,
                                        id_barang: this.props.data.id_barang  }] })}
                                    ><i class="fas fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </Collapse>
                        {/* {JSON.stringify(unit_list)} */}
                        <Form.Selection list={unit_list.map((item, i) => { return {...item, id:i.toString()} })} />
                    </div>
                    <KategoriBarang history_id={this.state.history_id} rincian_asset={this.state.rincian_asset} nextLapisan={this.nextLapisan} />
                    <button className="btn btn-primary mt-3 col-12" onClick={() =>this.props.submit(unit_list)}>Simpan</button>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditCore;