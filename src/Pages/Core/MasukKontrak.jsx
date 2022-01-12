import React from 'react';
import Service from '../../services/Services';
import TambahCore from './TambahCore';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import EditCore from './EditCore';
import DetailBarang from './DetailBarang';

// Component
import { ActionPopover, Card, DeleteModal, Pagination, Toast } from '../../components';

class MasukKontrak extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barang: null,
            filtered_barang: null,
            search_barang: null,
            rincian_asset: null,
            lapisan: 0,
            history: [],
            history_id: [],
            supplier: null,
            kontrak: null,

            // Pagination
            pagination: [],

            tambah_core: false,
            editCore: false,
            dataEdit: {
                nama_barang: '',
                id_vendor: '',
                id_rincian_asset: ''
            },

            // Toast
            message: {
                message: '',
                error: false
            },

            info: false,
            dataInfo: null,
            searchInput: '',
            deleteModal: false,
            deleteData: {
                id_barang: 0,
                nama_barang: ''
            }
        }
    }

    componentDidMount() {
        Service.getRincian(100000000000).then(res => {
            this.state.history.push({
                parent: 100000000000,
                data: res.data.data
            });
            this.setState({ history: this.state.history });
        })
        Service.getBarang().then(res => {
            Service.getDetailKontrak().then(res1 => {
                const detail_kontrak = res1.data.data.filter(item => item.id_kontrak == this.props.idKontrak);
                const barang = res.data.data.filter(item => {
                    const kontrak = detail_kontrak.find(item2 => item2.id_detail_kontrak == item.id_detail_kontrak);
                    return kontrak != null;
                })
                const final_barang = [];
                barang.forEach(item => {
                    if (final_barang.find(item2 => item.id_barang == item2.id_barang) == null) final_barang.push({
                        id_barang: item.id_barang,
                        keterangan: item.keterangan,
                        nama_barang: item.nama_barang,
                        vendor: item.nama_vendor,
                        id_vendor: item.id_vendor,
                        jumlah: res.data.data.filter(item2 => item2.id_barang == item.id_barang).length,
                        id_rincian_asset: item.id_rincian_asset,
                        rincian_asset: item.rincian_asset
                    })
                })
                this.setState({ barang: final_barang, filtered_barang: final_barang })
            })
        })
        Service.getSupplier().then(res => {
            this.setState({ supplier: res.data.data });
        })
    }

    changeId = (id, index) => {
        if (this.state.history_id[index] == id) {
            this.setState({ history_id: this.state.history_id.filter((item, index1) => index1 < index), history: this.state.history.filter((item, index1) => index1 < index + 1), lapisan: index }, () => {
                this.setState({ filtered_barang: this.state.barang.filter(item => {
                    const lapisan_pattern = [1, 1, 1, 2, 2, 2, 3];
                    const lapisan_index = lapisan_pattern.filter((item2, index2) => index2 < this.state.lapisan + 1);
                    const lapisan_akhir = this.state.history[this.state.history.length - 1].parent.toString().split('').filter((item2, index2) => index2 < lapisan_index.reduce((total, value) => total + value));
                    return item.id_rincian_asset.indexOf(lapisan_akhir.join('')) == 0;
                }) }, () => {
                    console.log(this.state.search_barang);
                    if (this.state.search_barang != null) this.setState({ search_barang: this.state.filtered_barang.filter(item => item.nama_barang.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) > -1) }, () => {
                        
                        return;
                    })
                    
                });
            });
            return;
        }
        Service.getRincian(id).then(res => {
            this.state.history_id = this.state.history_id.filter((item, index1) => index1 < index);
            this.state.history = this.state.history.filter((item, index1) => index1 < index + 1)
            this.state.history_id[index] = id;
            this.state.history[index + 1] = {
                parent: id,
                data: res.data.data
            }
            this.setState({ history: this.state.history, lapisan: index + 1 }, () => {
                this.setState({ filtered_barang: this.state.barang.filter(item => {
                    const lapisan_pattern = [1, 1, 1, 2, 2, 2, 3];
                    const lapisan_index = lapisan_pattern.filter((item2, index2) => index2 < this.state.lapisan + 1);
                    const lapisan_akhir = this.state.history[this.state.history.length - 1].parent.toString().split('').filter((item2, index2) => index2 < lapisan_index.reduce((total, value) => total + value));
                    return item.id_rincian_asset.indexOf(lapisan_akhir.join('')) == 0;
                }) }, () => {
                    if (this.state.search_barang != null) this.setState({ search_barang: this.state.filtered_barang.filter(item => item.nama_barang.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) > -1) }, () => {
                        
                        return;
                    })
                    
                })
            });
        });
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

    searching = (e) => {
        this.setState({ searchInput: e.target.value });
        if (e.target.value.length == 0) {
            this.setState({ search_barang: null }, () => {
                
            });
            return;
        } 
        this.setState({ search_barang: this.state.filtered_barang.filter(item => item.nama_barang.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) }, () => {
            
        });
    }

    changeDataEdit = (key, value) => {
        this.state.dataEdit[key] = value;
        this.setState({ dataEdit: this.state.dataEdit });
    }

    submitEdit = () => {
        const data = {
            nama_barang: this.state.dataEdit.nama_barang,
            id_vendor: this.state.dataEdit.id_vendor,
            id_rincian_asset: this.state.dataEdit.id_rincian_asset
        };
        Service.patchBarang(this.state.dataEdit.id_barang, data).then(res => {
            this.setState({ editCore: !this.state.editCore, barang: null, filtered_barang: null, history: [], history_id: [] }, () => {
                Service.getRincian(100000000000).then(res => {
                    this.state.history.push({
                        parent: 100000000000,
                        data: res.data.data
                    });
                    this.setState({ history: this.state.history });
                })
                Service.getBarang().then(res => {
                    Service.getDetailKontrak().then(res1 => {
                        const detail_kontrak = res1.data.data.filter(item => item.id_kontrak == this.props.idKontrak);
                        const barang = res.data.data.filter(item => {
                            const kontrak = detail_kontrak.find(item2 => item2.id_detail_kontrak == item.id_detail_kontrak);
                            return kontrak != null;
                        })
                        const final_barang = [];
                        barang.forEach(item => {
                            if (final_barang.find(item2 => item.id_barang == item2.id_barang) == null) final_barang.push({
                                id_barang: item.id_barang,
                                keterangan: item.keterangan,
                                nama_barang: item.nama_barang,
                                vendor: item.nama_vendor,
                                id_vendor: item.id_vendor,
                                jumlah: res.data.data.filter(item2 => item2.id_barang == item.id_barang).length,
                                id_rincian_asset: item.id_rincian_asset,
                                rincian_asset: item.rincian_asset
                            })
                        })
                        this.setState({ barang: final_barang, filtered_barang: final_barang })
                    })
                })
            });
            this.setMessage('Changed');
        }).catch(err => {
            this.setMessage(err, true);
        })
        
    }

    deleteBarang = (id) => {
        Service.deleteBarang(id).then(res => {
            this.setState({ deleteModal: !this.state.deleteModal, barang: null, filtered_barang: null, history: [], history_id: [] }, () => {
                Service.getRincian(100000000000).then(res => {
                    this.state.history.push({
                        parent: 100000000000,
                        data: res.data.data
                    });
                    this.setState({ history: this.state.history });
                })
                Service.getBarang().then(res => {
                    Service.getDetailKontrak().then(res1 => {
                        const detail_kontrak = res1.data.data.filter(item => item.id_kontrak == this.props.idKontrak);
                        const barang = res.data.data.filter(item => {
                            const kontrak = detail_kontrak.find(item2 => item2.id_detail_kontrak == item.id_detail_kontrak);
                            return kontrak != null;
                        })
                        const final_barang = [];
                        barang.forEach(item => {
                            if (final_barang.find(item2 => item.id_barang == item2.id_barang) == null) final_barang.push({
                                id_barang: item.id_barang,
                                keterangan: item.keterangan,
                                nama_barang: item.nama_barang,
                                vendor: item.nama_vendor,
                                id_vendor: item.id_vendor,
                                jumlah: res.data.data.filter(item2 => item2.id_barang == item.id_barang).length,
                                id_rincian_asset: item.id_rincian_asset,
                                rincian_asset: item.rincian_asset
                            })
                        })
                        this.setState({ barang: final_barang, filtered_barang: final_barang })
                    })
                })
            });
            this.setMessage('Deleted');
        }).catch(err => {
            this.setMessage(err, true);
        })
    }

    submitBarang = (barang, detail, id_kontrak) => {
        const error = [];
        Object.keys(barang).forEach(item => {
            if (barang[item] == '') error.push(item);
        })
        Object.keys(detail).forEach(item => {
            if (detail[item] == '' || detail === 0) error.push(item);
        })
        if (error.length > 0) {
            alert(`${error.join(', ')} are required!`);
            return;
        }
        Service.postBarang({ ...barang, id_rincian_asset: '100000000000' }).then(res => {
            Service.postDetailKontrak({
                ...detail,
                id_barang: res.data.data.id_barang,
                id_kontrak
            }).then(res => {
                this.setState({ tambah_core: !this.state.tambah_core, barang: null, filtered_barang: null, history: [], history_id: [] }, () => {
                    Service.getRincian(100000000000).then(res => {
                        this.state.history.push({
                            parent: 100000000000,
                            data: res.data.data
                        });
                        this.setState({ history: this.state.history });
                    })
                    Service.getBarang().then(res => {
                        Service.getDetailKontrak().then(res1 => {
                            const detail_kontrak = res1.data.data.filter(item => item.id_kontrak == this.props.idKontrak);
                            const barang = res.data.data.filter(item => {
                                const kontrak = detail_kontrak.find(item2 => item2.id_detail_kontrak == item.id_detail_kontrak);
                                return kontrak != null;
                            })
                            const final_barang = [];
                            barang.forEach(item => {
                                if (final_barang.find(item2 => item.id_barang == item2.id_barang) == null) final_barang.push({
                                    id_barang: item.id_barang,
                                    keterangan: item.keterangan,
                                    nama_barang: item.nama_barang,
                                    vendor: item.nama_vendor,
                                    id_vendor: item.id_vendor,
                                    jumlah: res.data.data.filter(item2 => item2.id_barang == item.id_barang).length,
                                    id_rincian_asset: item.id_rincian_asset,
                                    rincian_asset: item.rincian_asset
                                })
                            })
                            this.setState({ barang: final_barang, filtered_barang: final_barang })
                        })
                    })
                });
                this.setState({ tambah_core: !this.state.tambah_core });
                this.setMessage('Added')
            }).catch(err => {
                this.setMessage(err, true)
            })
        }).catch(err => {
            this.setMessage(err, true);
        })
    }

    render() { 
        return (
            <div>
                <Toast message={this.state.message.message} error={this.state.message.error}></Toast>
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <button className="btn btn-primary" onClick={() => this.setState({ tambah_core: !this.state.tambah_core })}>Tambah Barang</button>
                        <TambahCore toggle={() => this.setState({ tambah_core: !this.state.tambah_core })} open={this.state.tambah_core} kontrak={this.props.idKontrak} submit={(barang, detail) => {this.submitBarang(barang, detail, this.props.idKontrak)}}></TambahCore>
                    </div>
                    <div className="form-group w-25">
                        <input type="search" name="search" id="search" className="form-control form-search" placeholder="Cari Barang disini" onChange={this.searching} />
                    </div>
                </div>
                <button className="btn me-3 btn-back mt-2" onClick={this.props.back}><i class="fas fa-arrow-left"></i> Kembali</button>
                <div className="row mt-3">
                    <div className="col-lg-9">
                        {this.state.pagination != null ? (
                            this.state.pagination.length > 0 ? (
                                <div className="row">
                                    {this.state.pagination.map((item, index) => {
                                        return (
                                            <div className="col-lg-4 core-barang mb-4" key={index}>
                                                <Card>
                                                    <div className="foto">
                                                        <img src={require('./Default.png').default} alt="Default.png" width='50%' />
                                                    </div>
                                                    <div className='px-4 py-3'>
                                                        <h5>{item.nama_barang}</h5>
                                                        <h6>{item.vendor} <span>&#9679;</span> {item.rincian_asset} <span>&#9679;</span> {item.jumlah} Unit</h6>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='d-flex'>
                                                                <button className="btn" onClick={() => this.setState({ info: !this.state.info, dataInfo: item })}><i class="fas fa-info-circle"></i></button>
                                                                <button className="btn" id={`btn-trigger-${item.id_barang}`}><i class="fas fa-cog"></i></button>
                                                                <ActionPopover target={`btn-trigger-${item.id_barang}`} trigger="focus" placement="right" delete={() => this.setState({ deleteModal: !this.state.deleteModal, deleteData: item })} edit={() => this.setState({ editCore: !this.state.editCore, dataEdit: {...item} })}></ActionPopover>
                                                            </div>
                                                            <h6 className='my-auto'>{this.state.supplier != null ? this.state.supplier.find(item1 => item1.id_supplier == this.props.data.id_supplier).nama_supplier : 'Loading...'}</h6>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='h-100 no-item'>
                                    <div className='d-flex flex-column h-100 align-content-center'>
                                        <img src={require('../components/Img/NoItem.png').default} className='mx-auto' alt="NoItem" />
                                        <h5 className='text-center'>Tidak ada barang yang tersedia</h5>
                                        <h6 className='text-center'>Silahkan tambahkan barang</h6>
                                    </div>
                                </div>
                            )
                        ): (
                            <div className="row">
                                {[...Array(10)].map((item, index) => (
                                    <div className="col-lg-4 core-barang mb-3" key={index}>
                                        <Card>
                                            <div className="foto">
                                                
                                            </div>
                                            <div className='px-4 py-3'>
                                                <h5 className='placeholder-wave'><span className='placeholder col-3'></span></h5>
                                                <h6 className='placeholder-wave'><span className='placeholder col-4'></span> <span>&#9679;</span> <span className='placeholder col-4'></span> <span>&#9679;</span> <span className="placeholder col-4"></span> Unit</h6>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <button className="btn placeholder-wave"><span className="placeholder col-12"></span></button>
                                                        <button className="btn placeholder-wave"><span className="placeholder col-12"></span></button>
                                                    </div>
                                                    <h6 className='my-auto'><span className='placeholder col-12'></span></h6>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        )}
                        {this.state.barang != null && <Pagination data={(this.state.search_barang == null ? this.state.filtered_barang : this.state.search_barang)} get={(data) => this.setState({ pagination: [...data] })}></Pagination>}
                    </div>
                    <DeleteModal toggle={() => this.setState({ deleteModal: !this.state.deleteModal })} message="Apakah anda yakin untuk menghapus" item={this.state.deleteData.nama_barang} isOpen={this.state.deleteModal} submit={() => this.deleteBarang(this.state.deleteData.id_barang)}></DeleteModal>
                    <DetailBarang toggle={() => this.setState({ info: !this.state.info })} isOpen={this.state.info} data={this.state.dataInfo}></DetailBarang>
                    <EditCore toggle={() => this.setState({ editCore: !this.state.editCore })} data={this.state.dataEdit} changeData={this.changeDataEdit} submit={this.submitEdit} isOpen={this.state.editCore}></EditCore>
                    <div className="col-lg-3">
                        <Card className="sidebar-kanan">
                            <h5 className='mb-3'>Kategori Barang</h5>
                            {this.state.history.length > 0 ? (
                                <ul style={{ paddingLeft: 0 }}>
                                    {this.state.history[0].data.map(item => {
                                        return (
                                            <>
                                                <div className="form-group form-check">
                                                    <input type="checkbox" name="checkbox" id={`rincian${item.id_rincian_asset}`} className="form-check-input" onChange={() => {this.changeId(item.id_rincian_asset, 0)}} checked={this.state.history_id[0] == item.id_rincian_asset} />
                                                    <label htmlFor={`rincian${item.id_rincian_asset}`} className='form-check-label'>{item.rincian_asset.split(' ').map(item1 => {
                                                        if (item1 == null) return;
                                                        var sementara = item1.toLowerCase().split('');
                                                        sementara[0] = sementara[0].toUpperCase();
                                                        return sementara.join('');
                                                    }).join(' ')}</label>
                                                </div>
                                                <ul>
                                                    {this.state.history.length > 1 && this.state.history[1].parent == item.id_rincian_asset && (
                                                        this.state.history[1].data.map(item2 => {
                                                            return (
                                                                <>
                                                                    <div className="form-group form-check">
                                                                        <input type="checkbox" name="checkbox" id={`rincian${item2.id_rincian_asset}`} className="form-check-input" onChange={() => {this.changeId(item2.id_rincian_asset, 1)}} checked={this.state.history_id[1] == item2.id_rincian_asset} />
                                                                        <label htmlFor={`rincian${item2.id_rincian_asset}`} className='form-check-label'>{item2.rincian_asset.split(' ').map(item1 => {
                                                                            if (item1 == null) return;
                                                                            var sementara = item1.toLowerCase().split('');
                                                                            sementara[0] = sementara[0].toUpperCase();
                                                                            return sementara.join('');
                                                                        }).join(' ')}</label>
                                                                    </div>
                                                                    <ul>
                                                                        {this.state.history.length > 2 && this.state.history[2].parent == item2.id_rincian_asset && (
                                                                            this.state.history[2].data.map(item3 => {
                                                                                return (
                                                                                    <>
                                                                                        <div className="form-group form-check">
                                                                                            <input type="checkbox" name="checkbox" id={`rincian${item3.id_rincian_asset}`} className="form-check-input" onChange={() => {this.changeId(item3.id_rincian_asset, 2)}} checked={this.state.history_id[2] == item3.id_rincian_asset}  />
                                                                                            <label htmlFor={`rincian${item3.id_rincian_asset}`} className='form-check-label'>{item3.rincian_asset.split(' ').map(item1 => {
                                                                                                if (item1 == null) return;
                                                                                                var sementara = item1.toLowerCase().split('');
                                                                                                sementara[0] = sementara[0].toUpperCase();
                                                                                                return sementara.join('');
                                                                                            }).join(' ')}</label>
                                                                                        </div>
                                                                                        <ul>
                                                                                            {this.state.history.length > 3 && this.state.history[3].parent == item3.id_rincian_asset && (
                                                                                                this.state.history[3].data.map(item4 => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <div className="form-group form-check">
                                                                                                                <input type="checkbox" name="checkbox" id={`rincian${item4.id_rincian_asset}`} className="form-check-input" onChange={() => {this.changeId(item4.id_rincian_asset, 3)}} checked={this.state.history_id[3] == item4.id_rincian_asset}  />
                                                                                                                <label htmlFor={`rincian${item4.id_rincian_asset}`} className='form-check-label'>{item4.rincian_asset.split(' ').map(item1 => {
                                                                                                                    if (item1 == null) return;
                                                                                                                    var sementara = item1.toLowerCase().split('');
                                                                                                                    sementara[0] = sementara[0].toUpperCase();
                                                                                                                    return sementara.join('');
                                                                                                                }).join(' ')}</label>
                                                                                                            </div>
                                                                                                            <ul>
                                                                                                                {this.state.history.length > 4 && this.state.history[4].parent == item4.id_rincian_asset && (
                                                                                                                    this.state.history[4].data.map(item5 => {
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                                <div className="form-group form-check">
                                                                                                                                    <input type="checkbox" name="checkbox" id={`rincian${item5.id_rincian_asset}`} className="form-check-input" onChange={() => {this.changeId(item5.id_rincian_asset, 4)}} checked={this.state.history_id[4] == item5.id_rincian_asset}  />
                                                                                                                                    <label htmlFor={`rincian${item5.id_rincian_asset}`} className='form-check-label'>{item5.rincian_asset.split(' ').map(item1 => {
                                                                                                                                        if (item1 == null) return;
                                                                                                                                        var sementara = item1.toLowerCase().split('');
                                                                                                                                        sementara[0] = sementara[0].toUpperCase();
                                                                                                                                        return sementara.join('');
                                                                                                                                    }).join(' ')}</label>
                                                                                                                                </div>
                                                                                                                                <ul>
                                                                                                                                    {this.state.history.length > 5 && this.state.history[5].parent == item5.id_rincian_asset && (
                                                                                                                                        this.state.history[5].data.map(item6 => {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <div className="form-group form-check">
                                                                                                                                                        <input type="checkbox" name="checkbox" id={`rincian${item6.id_rincian_asset}`} className="form-check-input" onChange={() => {this.changeId(item6.id_rincian_asset, 5)}} checked={this.state.history_id[5] == item6.id_rincian_asset}  />
                                                                                                                                                        <label htmlFor={`rincian${item6.id_rincian_asset}`} className='form-check-label'>{item6.rincian_asset.split(' ').map(item1 => {
                                                                                                                                                            if (item1 == null) return;
                                                                                                                                                            var sementara = item1.toLowerCase().split('');
                                                                                                                                                            sementara[0] = sementara[0].toUpperCase();
                                                                                                                                                            return sementara.join('');
                                                                                                                                                        }).join(' ')}</label>
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            );
                                                                                                                                        })
                                                                                                                                    )}
                                                                                                                                </ul>
                                                                                                                            </>
                                                                                                                        );
                                                                                                                    })
                                                                                                                )}
                                                                                                            </ul>
                                                                                                        </>
                                                                                                    );
                                                                                                })
                                                                                            )}
                                                                                        </ul>
                                                                                    </>
                                                                                );
                                                                            })
                                                                        )}
                                                                    </ul>
                                                                </>
                                                            );
                                                        })
                                                    )}
                                                </ul>
                                            </>
                                        );
                                    })}
                                </ul>
                            ) : 'Loading...'}
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MasukKontrak;