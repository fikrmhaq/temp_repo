import React from 'react';

import Services from '../../services/Services';
import ModalEdit from './ModalEdit';
import MasukKontrak from './MasukKontrak';
import TambahDokumen from './TambahDokumen';
import Kontrak from './Kontrak';

// Component
import { Card, Pagination, Toast } from '../../components';
import Search from '../../components/Search';

class Core extends React.Component {
    state = {
        activeData: null,
        dataSearch: null,

        // Pagination
        pagination: [],

        search: null,
        modalCore: false,
        inputTambah: {
            nama_barang: '',
            id_vendor: ''
        },
        inputEdit: {
            nama_barang: ''
        },
        modalEdit: false,
        modalDetail: false,

        // Toast
        message: {
            message: '',
            error: false
        },

        vendor: null,
        kontrak: true,
        supplier: null,
        activeKontrak: null,
        tambahDokumen: false,
        inputKontrak: {
            nomor_kontrak: '',
            id_jenis_kontrak: '1',
            id_sumber_anggaran: '1',
            nilai_kontrak: '',
            ba_penerimaan_barang: '',
            tanggal_ba_penerimaan_barang: '',
            id_supplier: '',
        },
        dokumen: null,
        rincian_asset: null,
        barang: null,
        kontrak_id: null,
        kontrak_data: null,
        searching: '',
        activeDokumen: 1
    }

    componentDidMount() {
        if (!localStorage.getItem('logged')) window.location.href = 'http://192.168.2.16:3000'
        Services.getKontrak().then(res => {
            this.setState({ activeData: res.data.data.filter(item => item.id_jenis_kontrak == 1) });
        })
        Services.getVendor().then(res => {
            this.setState({ vendor: res.data.data });
        })
        Services.getSupplier().then(res => {
            this.setState({ supplier: res.data.data })
        });
        Services.getJenisKontrak().then(res => {
            this.setState({ dokumen: res.data.data })
        })
        Services.getBarang().then(res => {
            Services.getDetailKontrak().then(res1 => {
                const kontrak = new Object();
                res1.data.data.forEach(item => {
                    if (typeof kontrak[item.id_kontrak] == 'undefined') kontrak[item.id_kontrak] = new Array();
                    kontrak[item.id_kontrak].push({
                        ...res.data.data.find(item1 => item1.id_detail_kontrak == item.id_detail_kontrak),
                        total: res.data.data.filter(item1 => item1.id_detail_kontrak == item.id_detail_kontrak).length
                    });
                })
                this.setState({ rincian_asset: kontrak });
            })
        })
    }

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     * @returns 
     */
    whenSearch = (e) => {
        var value = e.target.value;
        this.setState({ searching: value });
        if (value == '' || value == null) return this.setState({ dataSearch: null });
        this.setState({ dataSearch: this.state.activeData.filter(item => item.nomor_kontrak.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) });
    }

    changeState = (key, value) => {
        this.state.inputTambah[key] = value;
        this.setState({ inputTambah: this.state.inputTambah });
    }

    changeEdit = (id) => {
        this.state.inputEdit.nama_barang = this.state.activeData.data.find(item => item.id_barang == id).nama_barang;
        this.setState({ inputEdit: this.state.inputEdit })
    }

    submitEdit = (id) => {
        if (this.state.inputEdit.nama_barang == '') {
            alert('All field are reuiqred');
            return;
        }
        const dataSubmit = {
            ...this.state.inputEdit,
            id_rincian_barang: id,
        }
        Services.editBarang(id, dataSubmit).then(res => {
            this.setMessage('Changed')
        }).catch(err => {
            this.setMessage(err, true)
        })
    }

    deleteData = (id) => {
        if (window.confirm('Are you sure')) {
            Services.deleteBarang(id).then(res => {
                this.state.activeData.data = this.state.activeData.data.filter(item => item.id_barang != id);
                this.setState({ activeData: this.state.activeData }, () => {
                    this.whenPaginate();
                    this.setMessage('Deleted')
                });
            }).catch(err => {
                this.setMessage(err, true)
            })
        }
    }

    changeKontrak = (key, value) => {
        this.state.inputKontrak[key] = value;
        this.setState({ inputKontrak: this.state.inputKontrak });
    }

    submitKontrak = () => {
        const error = [];
        Object.keys(this.state.inputKontrak).forEach(item => {
            if (this.state.inputKontrak[item] == '' || this.state.inputKontrak[item] == null) error.push(item);
        })
        if (error.length) {
            window.alert(`${error.join(', ')} are required!`);
            return;
        }
        const input = this.state.inputKontrak;
        if (input.tanggal_ba_penerimaan_barang.split('-').join('').length < 8) {
            window.alert('Tanggal BA less than 8 digit!');
            return;
        }
        var kirim = input;
        kirim.tanggal_ba_penerimaan_barang = kirim.tanggal_ba_penerimaan_barang.split('-').reverse().join('-');
        Services.postKontrak(kirim).then(res => {
            this.setMessage('Added');
            Services.getKontrak().then(res => {
                this.setState({ activeData: res.data.data.filter(item => item.id_jenis_kontrak == this.state.activeDokumen), tambahDokumen: false }, () => {
                    this.whenPaginate();
                });
            })
        }).catch(err => {
            this.setMessage(err, true);
        });
    }

    /**
     * Ini adalah function untuk mengirim pesan ke Toast
     * @param {String} message Parameter yang digunakan untuk mengirim pesan ke Toast
     * @param {Boolean} [error=false] Parameter yang digunakan untuk mengirim error ke Toast
     */
    setMessage = (message, error = false) => {
        this.setState({ message: { message, error } }, () => {
            setTimeout(() => this.setState({ message: { message: '', error: false } }), 5000);
        })
    }

    setTanggal = (tanggal) => {
        const date = new Date(tanggal);
        const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
    }

    changeDokumen = (e) => {
        Services.getKontrak().then(res => {
            this.setState({ activeData: res.data.data.filter(item => item.id_jenis_kontrak == e.target.value), dataSearch: this.state.searching != '' ? res.data.data.filter(item => item.id_jenis_kontrak == e.target.value).filter(item => item.nomor_kontrak.toLowerCase().indexOf(this.state.searching.toLowerCase()) > -1) : null, activeDokumen: e.target.value })
        })
    }

    refreshDokumen = (id) => {
        this.setState({ activeData: this.state.activeData.filter(item => item.id_kontrak != id), dataSearch: this.state.dataSearch != null ? this.state.dataSearch.filter(item => item.nomor_kontrak.toLowerCase().indexOf(this.state.searching.toLowerCase()) > -1) : null })
    }

    refreshDokumenEdit = () => {
        Services.getKontrak().then(res => {
            this.setState({ activeData: res.data.data.filter(item => item.id_jenis_kontrak == this.state.activeDokumen), dataSearch: this.state.dataSearch != null ? this.state.dataSearch.filter(item => item.nomor_kontrak.toLowerCase().indexOf(this.state.searching.toLowerCase()) > -1) : null })
        })
    }

    render() { 
        return (
            <div>
                {/* kontrak */}
                <TambahDokumen open={this.state.tambahDokumen} toggle={() => this.setState({ tambahDokumen: !this.state.tambahDokumen })} submit={this.submitKontrak} input={this.state.inputKontrak} changeKontrak={this.changeKontrak}></TambahDokumen>
                {this.state.kontrak && (
                    <>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary mb-3" onClick={() => this.setState({ tambahDokumen: !this.state.tambahDokumen })} submit={this.submitKontrak}>Tambah Dokumen</button>
                            <Search className="w-25" select={{ name: 'dokumen', id: "dokumen", onChange: this.changeDokumen, children: this.state.dokumen != null ? this.state.dokumen.map(item => ({ key: item.id_jenis_kontrak, value: item.nama_jenis })) : ([{ key: 'null', value: 'Loading...' }]) }} input={{ name: 'searchDokumen', id: "searchDokumen", placeholder: 'Search', onChange: this.whenSearch }}></Search>
                        </div>
                        <div className="row">
                            {this.state.pagination.map(item => (
                                <Kontrak data={item} changeKontrak={() => this.setState({ kontrak_id: item.id_kontrak, kontrak: !this.state.kontrak, kontrak_data: item })} rincian_asset={this.state.rincian_asset != null ? this.state.rincian_asset[item.id_kontrak] : 'Loading...'} refresh={this.refreshDokumen} refreshEdit={this.refreshDokumenEdit} message={this.setMessage}></Kontrak>
                            ))}
                            {this.state.activeData == null && [...Array(10)].map(item => (
                                <div className='col-lg-4 kontrak mt-3'>
                                    <Card classNameBody="my-2">
                                        <div className="row px-3">
                                            <div className="col-lg-6">
                                                <h5 className='placeholder-wave'><span className='placeholder col-3'></span></h5>
                                                <p className='placeholder-wave'><span className="placeholder col-5"></span></p>
                                                <h6 className='placeholder-wave'><span className="placeholder col-2"></span></h6>
                                                <p className='placeholder-wave'><span className="placeholder col-5"></span></p>
                                            </div>
                                            <div className="col-lg-6 ps-3">
                                                <h6 className='placeholder-wave'><span className="placeholder col-2"></span></h6>
                                                <p className='placeholder-wave'><span className="placeholder col-5"></span></p>
                                                <h6 className='placeholder-wave'><span className="placeholder col-2"></span></h6>
                                                <p className='placeholder-wave'><span className="placeholder col-5"></span></p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className='d-flex inline-btn'>
                                                <button className="btn placeholder-wave"><span className="placeholder col-12"></span></button>
                                                <button className="btn placeholder-wave"><span className="placeholder col-12"></span></button>
                                            </div>
                                            <button className="btn btn-primary placeholder-wave"><span className="placeholder col-12"></span></button>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {!this.state.kontrak && (
                    <MasukKontrak idKontrak={this.state.kontrak_id} data={this.state.kontrak_data} back={() => {this.setState({ kontrak: !this.state.kontrak })}}></MasukKontrak>
                )}
                {this.state.activeData != null && this.state.kontrak && <Pagination data={this.state.dataSearch || this.state.activeData} get={(data) => {this.setState({ pagination: data })}}></Pagination>}
                <ModalEdit toggle={() => this.setState({ modalEdit: !this.state.modalEdit })} isOpen={this.state.modalEdit} input={this.state.inputEdit} setInput={(e) => this.setState({ inputEdit: e })}></ModalEdit>
                <Toast message={this.state.message.message} error={this.state.message.error}></Toast>
            </div>
        );
    }
}
 
export default Core;