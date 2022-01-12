import React from 'react';
import Modals from './Modals';

// Component
import { Card, Pagination } from '../../components';

class Transaction extends React.Component {
    state = {
        data: [
            {
                id_barang: 1,
                nama: "Yasu Vang",
                tanggal_pinjam: "12-01-2015",
                tanggal_kembali: "14-01-2015",
                status_pinjam: "kembali",
            },
            {
                id_barang: 2,
                nama: "Yannic Wong",
                tanggal_pinjam: "14-02-2016",
                tanggal_kembali: "14-03-2016",
                status_pinjam: "kembali",
            },
            {
                id_barang: 3,
                nama: "Henny Aleksandrov",
                tanggal_pinjam: "12-12-2015",
                tanggal_kembali: "null",
                status_pinjam: "hilang",
            },
            {
                id_barang: 4,
                nama: "Indigo Bain",
                tanggal_pinjam: "28-04-2016",
                tanggal_kembali: "null",
                status_pinjam: "masih pinjam",
            },
            {
                id_barang: 5,
                nama: "Chris Antal",
                tanggal_pinjam: "15-05-2015",
                tanggal_kembali: "25-05-2015",
                status_pinjam: "kembali",
            },
            {
                id_barang: 6,
                nama: "Freddie Wells",
                tanggal_pinjam: "29-12-2017",
                tanggal_kembali: "30-12-2017",
                status_pinjam: "kembali",
            },
            {
                id_barang: 7,
                nama: "Garnett Accursio",
                tanggal_pinjam: "06-06-2016",
                tanggal_kembali: "null",
                status_pinjam: "hilang",
            },
            {
                id_barang: 8,
                nama: "Otobong Alderliesten",
                tanggal_pinjam: "12-11-2016",
                tanggal_kembali: "14-12-2016",
                status_pinjam: "kembali",
            },
            {
                id_barang: 9,
                nama: "Delshad Armando",
                tanggal_pinjam: "15-07-2017",
                tanggal_kembali: "null",
                status_pinjam: "masih pinjam",
            },
            {
                id_barang: 10,
                nama: "Oakley Fava",
                tanggal_pinjam: "11-11-2011",
                tanggal_kembali: "12-12-2012",
                status_pinjam: "kembali",
            },
            {
                id_barang: 11,
                nama: "Shashi McGinnis",
                tanggal_pinjam: "27-09-2017",
                tanggal_kembali: "14-11-2017",
                status_pinjam: "kembali",
            },
            {
                id_barang: 12,
                nama: "Rudo Davis",
                tanggal_pinjam: "09-09-2009",
                tanggal_kembali: "null",
                status_pinjam: "hilang",
            },
            {
                id_barang: 13,
                nama: "Dilshad Magro",
                tanggal_pinjam: "30-01-2021",
                tanggal_kembali: "01-11-2021",
                status_pinjam: "kembali",
            },
            {
                id_barang: 14,
                nama: "Adetokunbo Hobbes",
                tanggal_pinjam: "06-06-2019",
                tanggal_kembali: "07-06-2019",
                status_pinjam: "kembali",
            },
            {
                id_barang: 15,
                nama: "Shanon Jardine",
                tanggal_pinjam: "18-09-2017",
                tanggal_kembali: "null",
                status_pinjam: "masih pinjam",
            },
            {
                id_barang: 16,
                nama: "Xquenda Elena",
                tanggal_pinjam: "16-12-2020",
                tanggal_kembali: "null",
                status_pinjam: "hilang",
            },
            {
                id_barang: 17,
                nama: "Cherokee Johnsen",
                tanggal_pinjam: "11-11-2001",
                tanggal_kembali: "09-10-2002",
                status_pinjam: "kembali",
            },
            {
                id_barang: 18,
                nama: "Ji-Hu Monet",
                tanggal_pinjam: "25-05-2005",
                tanggal_kembali: "06-06-2005",
                status_pinjam: "kembali",
            },
            {
                id_barang: 19,
                nama: "Nao Hino",
                tanggal_pinjam: "11-09-2009",
                tanggal_kembali: "null",
                status_pinjam: "hilang",
            },
            {
                id_barang: 20,
                nama: "Sandy Dallas",
                tanggal_pinjam: "01-01-2021",
                tanggal_kembali: "null",
                status_pinjam: "masih pinjam",
            },
        ],
        dataSearch: null,
        pagination: []
    }

    componentDidMount() {
        if (!localStorage.getItem('logged')) window.location.href = 'http://192.168.2.16:3000';
    }

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    searching = (e) => {
        if (e.target.value == '') return this.setState({ dataSearch: null });
        this.setState({ dataSearch: this.state.data.filter(item => item.nama.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) });
    }

    render() { 
        return (
            <div className='transaksi'>
                <div className="d-flex justify-content-between mb-4">
                    <button className="btn btn-primary">Tambah Transaksi</button>
                    <div className="d-flex w-25">
                        <div className="form-group w-25">
                            <select name="type" id="type" className="form-select form-search">
                                <option value="0">Semua</option>
                            </select>
                        </div>
                        <div className="form-group ms-2 w-75">
                            <input type="search" name="search" id="search" className="form-control form-search" placeholder='Cari disini' onChange={this.searching} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {this.state.pagination.map(item => (
                        <div className="col-lg-6 mb-4 transaksi-item">
                            <Card>
                                <div className='d-grid px-2 py-1' style={{ gridTemplateColumns: '40% 25% 25% 10%' }}>
                                    <div className='title'>
                                        <h5>{item.nama}</h5>
                                        <p className='m-0'>02 Desember 2021 &#9679; 03 Desember 2021</p>
                                    </div>
                                    <div className="d-flex asset">
                                        <h5 className='my-auto'>Komputer</h5>
                                    </div>
                                    <div className='d-flex status'>
                                        <div className='my-auto'>
                                            <h5 className={'m-0 ' + (item.status_pinjam == 'kembali' ? 'text-success ' : '') + (item.status_pinjam == 'hilang' ? 'text-danger ' : '') + (item.status_pinjam == 'masih pinjam' ? 'text-primary' : '')}>{item.status_pinjam}</h5>
                                            <p className="m-0">status</p>
                                        </div>
                                    </div>
                                    <div className='d-flex action'>
                                        <div className='my-auto ms-auto'>
                                            <button className="btn"><i class="fas fa-info-circle"></i></button>
                                            <button className="btn"><i class="fas fa-cog"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                {this.state.data != null && <Pagination data={this.state.dataSearch == null ? this.state.data : this.state.dataSearch} get={(data) => this.setState({ pagination: data })}></Pagination>}
            </div>
        );
    }
}
 
export default Transaction;