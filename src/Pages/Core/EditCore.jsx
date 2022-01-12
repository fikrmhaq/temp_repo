import React from 'react';
import { Collapse, Modal, ModalBody } from 'reactstrap';
import Services from '../../services/Services';

class EditCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVendor: null,
            inputVendor: {
                nama: ''
            },
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
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} className='edit-core' centered>
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
                        <div className="detail px-2 py-3 mt-3 rounded-3">
                            <div className="form-group">
                                <input type="text" name="search" id="search" className="form-control" placeholder="Search" onChange={this.vendorSearch} />
                            </div>
                            <ul className="nav flex-column mt-3 px-1">
                                {this.state.dataVendor != null ? (
                                    this.state.dataSearchVendor.map(item => {
                                        return (
                                            <li className={"nav-item py-2 px-3 rounded-3 mb-2 " + (this.props.data.id_vendor == item.id_vendor && 'active')} onClick={() => {this.props.changeData('id_vendor', item.id_vendor)}}>
                                                {item.nama}
                                            </li>
                                        );
                                    })
                                ) : "Loading..."}
                            </ul>
                        </div>
                    </div>
                    <div className="kategori-container">
                        <label htmlFor="kategori">Kategori</label>
                        <p className='m-0'>Memasukan barang ke “{this.state.history_id[this.state.history_id.length - 1] == 100000000000 ? 'Asset' : (typeof this.state.rincian_asset[this.state.rincian_asset.length - 2] != 'undefined' && this.state.rincian_asset[this.state.rincian_asset.length - 2].find(item => item.id_rincian_asset == this.state.history_id[this.state.history_id.length - 1]).rincian_asset)}”</p>
                        <div className="kategori-isi py-3">
                            {this.state.rincian_asset.length > 0 ? (
                                <ul>
                                    {this.state.rincian_asset[0].map(item => (
                                        <>
                                            <li>
                                                <div className="form-check">
                                                    <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => this.nextLapisan(item.id_rincian_asset, 1)} checked={item.id_rincian_asset == this.state.history_id[1]} />
                                                    <label htmlFor="check" className='form-check-label'>{item.rincian_asset}</label>
                                                </div>
                                            </li>
                                            {typeof this.state.history_id[1] != 'undefined' && this.state.history_id[1] == item.id_rincian_asset && (
                                                <ul>
                                                    {this.state.rincian_asset[1] != null && this.state.rincian_asset[1].map(item1 => (
                                                        <li>
                                                            <>
                                                                <div className="form-check">
                                                                    <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => this.nextLapisan(item1.id_rincian_asset, 2)} checked={item1.id_rincian_asset == this.state.history_id[2]} />
                                                                    <label htmlFor="check" className='form-check-label'>{item1.rincian_asset}</label>
                                                                </div>
                                                                {typeof this.state.history_id[2] != 'undefined' && this.state.history_id[2] == item1.id_rincian_asset && (
                                                                    <ul>
                                                                        {this.state.rincian_asset[2] != null && this.state.rincian_asset[2].map(item2 => (
                                                                            <li>
                                                                                <>
                                                                                    <div className="form-check">
                                                                                        <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => this.nextLapisan(item2.id_rincian_asset, 3)} checked={item2.id_rincian_asset == this.state.history_id[3]} />
                                                                                        <label htmlFor="check" className='form-check-label'>{item2.rincian_asset}</label>
                                                                                    </div>
                                                                                    {typeof this.state.history_id[3] != 'undefined' && this.state.history_id[3] == item2.id_rincian_asset && (
                                                                                        <ul>
                                                                                            {this.state.rincian_asset[3] != null && this.state.rincian_asset[3].map(item3 => (
                                                                                                <li>
                                                                                                    <>
                                                                                                        <div className="form-check">
                                                                                                            <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => this.nextLapisan(item3.id_rincian_asset, 4)} checked={item3.id_rincian_asset == this.state.history_id[4]} />
                                                                                                            <label htmlFor="check" className='form-check-label'>{item3.rincian_asset}</label>
                                                                                                        </div>
                                                                                                        {typeof this.state.history_id[4] != 'undefined' && this.state.history_id[4] == item3.id_rincian_asset && (
                                                                                                            <ul>
                                                                                                                {this.state.rincian_asset[4] != null && this.state.rincian_asset[4].map(item4 => (
                                                                                                                    <li>
                                                                                                                        <>
                                                                                                                            <div className="form-check">
                                                                                                                                <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => this.nextLapisan(item4.id_rincian_asset, 5)} checked={item4.id_rincian_asset == this.state.history_id[5]} />
                                                                                                                                <label htmlFor="check" className='form-check-label'>{item4.rincian_asset}</label>
                                                                                                                            </div>
                                                                                                                            {typeof this.state.history_id[5] != 'undefined' && this.state.history_id[5] == item4.id_rincian_asset && (
                                                                                                                                <ul>
                                                                                                                                    {this.state.rincian_asset[5] != null && this.state.rincian_asset[5].map(item5 => (
                                                                                                                                        <li>
                                                                                                                                            <>
                                                                                                                                                <div className="form-check">
                                                                                                                                                    <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => this.nextLapisan(item5.id_rincian_asset, 6)} checked={item5.id_rincian_asset == this.state.history_id[6]} />
                                                                                                                                                    <label htmlFor="check" className='form-check-label'>{item5.rincian_asset}</label>
                                                                                                                                                </div>
                                                                                                                                                
                                                                                                                                            </>
                                                                                                                                        </li>
                                                                                                                                    ))}
                                                                                                                                </ul>
                                                                                                                            )}
                                                                                                                        </>
                                                                                                                    </li>
                                                                                                                ))}
                                                                                                            </ul>
                                                                                                        )}
                                                                                                    </>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    )}
                                                                                </>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ))}
                                </ul>
                            ) : 'Loading...'}
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3 col-12" onClick={this.props.submit}>Simpan</button>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditCore;