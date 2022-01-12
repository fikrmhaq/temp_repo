import React from 'react';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import { ActionPopover, Card, DeleteModal, Pagination } from '../../../components';
import Services from '../../../services/Services';
import EditVendor from './EditVendor';
import Info from './Info';
import TambahVendor from './TambahVendor';

class Vendor extends React.Component {
    state = {
        activeData: null,
        pagination: [],
        tambahVendor: false,
        info: '0',
        delete: '0',
        edit: '0'
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        Services.getVendor().then(res => {
            this.setState({ activeData: res.data.data })
        })
    }

    setTanggal = (tanggal) => {
        const date = new Date(tanggal);
        const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
    }

    render() {
        return (
            <div className='vendor'>
                <button className="btn btn-primary d-block mb-3" onClick={() => this.setState({ tambahVendor: !this.state.tambahVendor })}>Tambah Vendor</button>
                <button className="btn btn-back mb-3" onClick={this.props.back}><i class="fas fa-long-arrow-alt-left"></i> Kembali</button>
                <div className="row">
                    {this.state.pagination.map(item => (
                        <div className="col-lg-6 mb-3">
                            <Card>
                                <div className='d-flex px-2 justify-content-between vendor-card'>
                                    <div>
                                        <h5>{item.nama}</h5>
                                        <h6>{this.setTanggal(item.created_date)} &#9679; {this.setTanggal(item.last_update)}</h6>
                                    </div>
                                    <div className='my-auto'>
                                        <button className="btn" onClick={() => this.setState({ info: item.id_vendor })}><i class="fas fa-info-circle"></i></button>
                                        <button className="btn" id={`btn-settings-${item.id_vendor}`}><i class="fas fa-cog"></i></button>
                                        <ActionPopover target={`btn-settings-${item.id_vendor}`} placement='right' delete={() => this.setState({ delete: item.id_vendor })} edit={() => this.setState({ edit: item.id_vendor })}></ActionPopover>
                                    </div>
                                </div>
                                <Info toggle={() => this.setState({ info: '0' })} isOpen={this.state.info == item.id_vendor} data={item} />
                                <DeleteModal toggle={() => this.setState({ delete: '0' })} isOpen={this.state.delete == item.id_vendor} message="Apakah anda yakin ingin menghapus" item={item.nama}></DeleteModal>
                                <EditVendor toggle={() => this.setState({ edit: '0' })} isOpen={this.state.edit == item.id_vendor} data={item} refresh={this.refresh}></EditVendor>
                            </Card>
                        </div>
                    ))}
                </div>
                {this.state.activeData != null && <Pagination data={this.state.activeData} get={(data) => this.setState({ pagination: data })}></Pagination>}
                <TambahVendor toggle={() => this.setState({ tambahVendor: !this.state.tambahVendor })} isOpen={this.state.tambahVendor} refresh={this.refresh} />
            </div>
        );
    }
}
 
export default Vendor;