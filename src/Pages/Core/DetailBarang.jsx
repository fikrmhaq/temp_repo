import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Services from '../../services/Services';
import ModalDenah from './ModalDenah';

class DetailBarang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            rincian_asset: [],
            detail_barang: null,
            last_rincian: null,
            id_rincian_asset: null,
            ruangan: null,
            id_detail_barang: null
        }
    }

    onMount = () => {
        this.setState({ data: this.props.data, rincian_asset: [], detail_barang: null }, () => {
            const lapisan = [1, 1, 1, 2, 2, 2, 3];
            const hasil = [];
            lapisan.forEach((item, index, elem) => {
                const jumlah = elem.filter((item1, index1) => index1 < index + 1).reduce((total, value) => total + value);
                hasil.push(this.state.data.id_rincian_asset.toString().split('').filter((item1, index1) => index1 < jumlah).join('') + ([...Array(elem.reduce((total, value) => total + value) - jumlah)].map(() => '0').join('')));
            })
            const final = [];
            hasil.forEach(item => {
                if (final.indexOf(item) < 0) final.push(item)
            })
            this.setState({ id_rincian_asset: final }, () => {
                this.state.id_rincian_asset.forEach(item => {
                    Services.getOneRincian(item).then(res => {
                        this.state.rincian_asset.push(res.data.data);
                        this.setState({ rincian_asset: this.state.rincian_asset }, () => {
                            const jumlah = this.state.rincian_asset.length;
                            const jumlah_rincian = this.state.id_rincian_asset.length;
                            if (jumlah != jumlah_rincian) return;
                            const lama = [...this.state.rincian_asset];
                            this.state.rincian_asset = this.state.id_rincian_asset.map(item => {
                                return lama.find(item1 => item1.id_rincian_asset == item);
                            })
                            this.setState({ rincian_asset: this.state.rincian_asset })
                        })
                    })
                })
            })
            Services.getDetailBarang().then(res => {
                Services.getAssetRuangan().then(res1 => {
                    this.setState({ detail_barang: res.data.data.filter(item => item.id_barang == this.state.data.id_barang).map(item => ({
                        ...item,
                        ruangan: res1.data.data.find(item1 => item1.id_asset == item.id_detail_barang) != undefined ? res1.data.data.find(item1 => item1.id_asset == item.id_detail_barang).id_ruangan : null
                    })) })
                })
            })
            Services.getRuangan().then(res => {
                this.setState({ ruangan: res.data.data });
            })
        })
    }

    render() { 
        return (
            <Modal className='modal-detail-barang' onOpened={this.onMount} isOpen={this.props.isOpen} on toggle={this.props.toggle} centered unmountOnClose={true}>
                <ModalBody>
                    <div className="d-flex justify-content-between">
                        <h5 className='modal-title mt-auto'>Detail Barang</h5>
                        <button className="btn my-auto" onClick={this.props.toggle}>&times;</button>
                    </div>
                    <p className='mb-3 subtitle'>"{this.state.data != null && this.state.data.nama_barang}"</p>
                    <h6>Spesifikasi</h6>
                    <p className='spek'>Tidak ada spesifikasi</p>
                    <h6>Kategori</h6>
                    <div className="d-flex flex-wrap mb-3">
                        {this.state.rincian_asset.length ? this.state.rincian_asset.map(item => (
                            <div className="rincian-asset m-1 py-1 px-3">{item.rincian_asset.split(' ').map(item1 => {
                                if (item1 == null) return;
                                var sementara = item1.toLowerCase().split('');
                                sementara[0] = sementara[0].toUpperCase();
                                return sementara.join('');
                            }).join(' ')}</div>
                        )) : 'Loading...'}
                    </div>
                    <h6>Detail Unit</h6>
                    <div className="detail-unit py-3">
                        <ol className='mb-0'>
                            {this.state.detail_barang != null ? this.state.detail_barang.map(item => (
                                <li className='mb-3 me-2'>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            {this.state.data.nama_barang}
                                            <p className='m-0'>{this.state.ruangan != null && item.ruangan != null ? this.state.ruangan.find(item1 => item1.id_ruangan == item.ruangan).nama_ruangan : ''}</p>
                                        </div>
                                        <div>
                                            <button className="btn btn-sm" onClick={() => this.setState({ id_detail_barang: item.id_detail_barang })}>Lokasi</button>
                                            <ModalDenah toggle={() => this.setState({ id_detail_barang: null })} isOpen={this.state.id_detail_barang == item.id_detail_barang} data={item}></ModalDenah>
                                        </div>
                                    </div>
                                </li>
                            )) : 'Loading...'}
                        </ol>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default DetailBarang;