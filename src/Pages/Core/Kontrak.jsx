import React from 'react';

import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import Services from '../../services/Services';
import EditDokumen from './EditDokumen';

// Component
import { ActionPopover, Card, DeleteModal } from '../../components';

class Kontrak extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rincian_asset: null,
            deleteModal: false,
            editModal: false
        }
    }

    /**
     * Ini adalah fungsi untuk mem format tanggal
     * @param {String} tanggal Parameter untuk memasukkan tanggal
     */
    ubahTanggal = (tanggal) => {
        const date = new Date(tanggal);
        const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
    }

    /**
     * Ini adalah fungsi untuk menghapus kontrak
     */
    deleteKontrak = () => {
        Services.deleteKontrak(this.props.data.id_kontrak).then(res => {
            this.props.message({ message: 'Deleted', err: false });
            this.setState({ deleteModal: !this.state.deleteModal }, () => {
                this.props.refresh(this.props.data.id_kontrak);
            })
        })
    }

    render() { 
        return (
            <div className='col-lg-4 kontrak mt-3'>
                <Card classNameBody="my-2">
                    <div className="row px-3">
                        <div className="col-lg-6">
                            <h5>Kontrak</h5>
                            <p>{this.ubahTanggal(this.props.data.tanggal_ba_penerimaan_barang)}</p>
                            <h6>Dana</h6>
                            <p>Rp. {this.props.data.nilai_kontrak.toString().split('').reverse().map((item, index, elem) => {
                                if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
                                return item;
                            }).join('').split('').reverse()}</p>
                        </div>
                        <div className="col-lg-6 ps-3">
                            <h6>Nomor Kontrak</h6>
                            <p>{this.props.data.nomor_kontrak}</p>
                            <h6>Berita Acara</h6>
                            <p>{this.props.data.ba_penerimaan_barang}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className='d-flex inline-btn'>
                            <button className="btn" id={`info-btn-${this.props.data.id_kontrak}`}><i class="fas fa-info-circle"></i></button>
                            <UncontrolledPopover className='popover-kontrak' placement='right-start' target={`info-btn-${this.props.data.id_kontrak}`} trigger="legacy">
                                <PopoverBody>
                                    <div>
                                        <h6 className='m-0'>Kategori</h6>
                                        <div className='d-flex flex-wrap container-popover mt-2 mb-2'>
                                            {typeof this.props.rincian_asset == 'object' ? this.props.rincian_asset.filter(item => item.total > 0).map(item => item.rincian_asset).filter((item, index, elem) => {
                                                if (elem.indexOf(item) == index) return true;
                                            }).filter((item, index) => index < 5).map(item => (
                                                <div className='py-1 px-3 m-1'>{item.toLowerCase().split(' ').map(item1 => {
                                                    var hasil = item1.split('');
                                                    hasil[0] = hasil[0].toUpperCase();
                                                    return hasil.join('');
                                                }).join(' ')}</div>
                                            )) : (
                                                <div className='d-flex' style={{ background: 'transparent' }}>
                                                    <img src={require('../components/Img/NoItemSm.png').default} alt="NoItemSm.png" />
                                                    <p className='m-0 my-auto'>Tidak ada Kategori</p>
                                                </div>
                                            )}
                                        </div>
                                        <h6 className='m-0'>Barang</h6>
                                        <div className="d-flex flex-wrap container-popover mt-2 mb-2">
                                            {typeof this.props.rincian_asset == 'object' ? this.props.rincian_asset.filter(item => item.total > 0).filter((item, index) => index < 5).map((item, index, elem) => {
                                                if (index + 1 > 5) return (
                                                    <>
                                                        <div className="py-1 px-3 m-1">{item.nama_barang}</div>
                                                        <div className="py-1 px-3 m-1">{elem.length - 5}+</div>
                                                    </>
                                                );
                                                return <div className="py-1 px-3 m-1">{item.nama_barang}</div>;
                                            }) : (
                                                <div className='d-flex' style={{ background: 'transparent' }}>
                                                    <img src={require('../components/Img/NoItemSm.png').default} alt="NoItemSm.png" />
                                                    <p className='m-0 my-auto'>Tidak ada Barang</p>
                                                </div>
                                            )}
                                            {typeof this.props.rincian_asset == 'string' && this.props.rincian_asset}
                                        </div>
                                    </div>
                                </PopoverBody>
                            </UncontrolledPopover>
                            <button className="btn" id={`action-btn-${this.props.data.id_kontrak}`}><i class="fas fa-cog"></i></button>
                            <ActionPopover target={`action-btn-${this.props.data.id_kontrak}`} trigger="focus" placement='right' delete={() => this.setState({ deleteModal: !this.state.deleteModal })} edit={() => this.setState({ editModal: !this.state.editModal })}></ActionPopover>
                        </div>
                        <DeleteModal toggle={() => this.setState({ deleteModal: !this.state.deleteModal })} isOpen={this.state.deleteModal} message='Apakah anda yakin untuk menghapus' item={this.props.data.nomor_kontrak} submit={this.deleteKontrak}></DeleteModal>
                        <EditDokumen toggle={() => this.setState({ editModal: !this.state.editModal })} isOpen={this.state.editModal} data={this.props.data} refreshEdit={this.props.refreshEdit}></EditDokumen>
                        <button className="btn btn-primary px-4" onClick={this.props.changeKontrak}>Lihat</button>
                    </div>
                </Card>
            </div>
        );
    }
}
 
export default Kontrak;