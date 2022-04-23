import React, { useRef, useState } from 'react'
import { Collapse, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Vendor } from '..'
import { useVendor } from '../../../../functions/hooks/states'
import { Form } from '../../../components/Form/Form'
import { Dialog } from '../../../components/Modal/Modal'
import Cleave from 'cleave.js/react';
import { useControllerState } from '../../../../controllers/Core'

const EditBarang = ({ open, item }) => {


    const [trigger, setTrigger] = useState(
        {
            vendor: false,
            unit: false
        }
    )

    const [input_vendor, setInputVendor] = useState('')


    const [input_unit, setInputUnit] = useState('')
    const [unit_list, setUnitList] = useState([])

    const vendorState = useVendor()



    return (
        <Dialog title="Edit Barang" open={open} >
            <Form.Input label="Nama Barang" />
            <div className="detail-container mb-2">
                <div className="d-flex justify-content-between">
                    <div className="mt-auto">
                        Vendor
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm" onClick={() => setTrigger({ ...trigger, vendor: !trigger.vendor })}>+</button>
                    </div>
                </div>
                <Collapse isOpen={trigger.vendor}>
                    <div className="d-flex pt-3">
                        <div className="form-group w-100">
                            <input type="text" name="vendor" id="vendor" className="form-control" placeholder="Vendor"
                                onChange={(e) => setInputVendor(e.target.value)} value={input_vendor}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary ms-3 btn-sm"
                            // onClick={this.newVendor}
                            ><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </Collapse>
                <Vendor dataVendor={
                    vendorState
                }
                // dataSearchVendor={this.state.dataSearchVendor} id_vendor={this.props.data.id_vendor} onChange={(id) => this.props.changeData('id_vendor', id)}
                />
            </div>
            <div className="detail-container mb-2">
                <div className="d-flex justify-content-between">
                    <div className="mt-auto">
                        Unit
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm" onClick={() => setTrigger({ ...trigger, unit: !trigger.unit })}>+</button>
                    </div>
                </div>
                <Collapse isOpen={trigger.unit}>
                    <div className="d-flex pt-3">
                        <div className="form-group w-100">
                            <input type="text" name="Unit" id="vendor" className="form-control" placeholder="Unit"
                                onChange={(e) => setInputUnit(e.target.value)} value={input_unit}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary ms-3 btn-sm"
                                onClick={
                                    () => setUnitList([...unit_list, {
                                        nama: input_unit,
                                        id_detail_kontrak: item.id_detail_kontrak,
                                        id_barang: item.id_barang
                                    }])
                                }
                            ><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </Collapse>
                {/* {JSON.stringify(unit_list)} */}
                <Form.Selection list={unit_list.map((item, i) => { return { ...item, id: i.toString() } })} />
            </div>
            {/* <h6>Detail Unit</h6>
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
            </div> */}
        </Dialog>
    )
}

export const TambahBarang = (
    {
        toggle,
        open,
        data
    }
) => {

    const { postBarang } = useControllerState()

    const [inputDetail, setInputDetail] = useState(
        {
            img : null,
            nama_barang: '',
            harga: 1,
            jumlah: 1,
            id_vendor: '',
            id_rincian: null

        }
    )
    const UploadRef = useRef()

    const submit = () => {
        postBarang(inputDetail)
        toggle()
    }

    return (
        <Modal toggle={toggle} isOpen={open} className="tambah-barang" centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-2">
                    <h5 className='modal-title'>Tambah Aset</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="nama_barang">Nama Aset</label>
                    <input type="text" name="nama_barang" id="nama_barang" className="form-control" placeholder="Input nama barang disini"
                        onChange={(e) => setInputDetail({ ...inputDetail, nama_barang: e.target.value })} value={inputDetail.nama_barang}
                    />
                </div>
                <div className="row mb-2">
                    <div className="form-group col-lg-6">
                        <label htmlFor="jumlah">Jumlah</label>
                        <Cleave options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} id='jumlah' className="form-control" placeholder="Input jumlah disini"
                            onChange={(e) => setInputDetail({ ...inputDetail, jumlah: e.target.value })} value={inputDetail.jumlah}
                        ></Cleave>
                    </div>
                    <div className="form-group col-lg-6">
                        <label htmlFor="harga_satuan">Harga</label>
                        <Cleave options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} className='form-control' id='harga_satuan' placeholder='Harga Satuan'
                            onChange={(e) => setInputDetail({ ...inputDetail, harga: e.target.value })} value={inputDetail.harga}
                        ></Cleave>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="d-flex justify-content-between">
                        <div className="mt-auto">
                            Vendor
                        </div>
                        <div>
                            <button className="btn btn-primary btn-sm"
                            // onClick={() => this.setState({ vendor: !this.state.vendor })}
                            >+</button>
                        </div>
                    </div>
                    <Collapse
                    // isOpen={this.state.vendor}
                    >
                        <div className="d-flex pt-3">
                            <div className="form-group w-100">
                                <input type="text" name="vendor" id="vendor" className="form-control" placeholder="Vendor"
                                // onChange={(e) => { this.changeVendor('nama', e.target.value) }}
                                //  value={this.state.inputVendor.nama}
                                />
                            </div>
                            <div>
                                <button className="btn btn-primary ms-3 btn-sm"
                                // onClick={this.newVendor}
                                ><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </Collapse>
                    <div className="detail px-2 py-3 mt-3 rounded-3 mb-3">
                        <div className="form-group">
                            <input type="text" name="search" id="search" className="form-control" placeholder="Search"
                            // onChange={this.vendorSearch}
                            />
                        </div>
                        <ul className="nav flex-column mt-3 px-1">
                            {
                                data.vendor.map(item => {
                                    return (
                                        <li className={"nav-item py-2 px-3 rounded-3 mb-2 " + (inputDetail.id_vendor == item.id_vendor && 'active')}
                                            onClick={() => setInputDetail({
                                                ...inputDetail,
                                                id_vendor: item.id_vendor
                                            })}
                                        >
                                            {item.nama_vendor}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="form-group col-lg-6">
                        <input ref={UploadRef} type="file" style={{ display: 'none' }} onChange={ (e) => setInputDetail({...inputDetail, img: e.target.files[0]}) } />
                        <button class="btn btn-primary" onClick={() => UploadRef.current.click() } >Upload</button>
                    </div>
                    <div className="form-group col-lg-6">
                        
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary shadow-none"
                    onClick={() => submit()}
                >Save</button>
            </ModalFooter>
        </Modal>
    )
}

const DeleteBarang = ({ open, toggle, item }) => {
    const { deleteCoreBarang } = useControllerState()

    const { _id, nama_barang } = item

    const submit = () => {
        console.log(item)
        deleteCoreBarang(_id)
        toggle()
    }

    return(
        <Modal 
        toggle={toggle}
         isOpen={open} className='modal-delete' centered>
                <ModalBody className='px-3'>
                    <h5 className="modal-title text-center">Konfirmasi</h5>
                    <p className='text-center'>Apakah anda yakin untuk menghapus</p>
                    <h5 className='text-center'>{nama_barang}</h5>
                    <div className="row mt-4">
                        <div className="col-lg-6">
                            <button className="btn btn-secondary col-12" onClick={toggle}>Tidak</button>
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-danger col-12" onClick={submit}>Hapus</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
    )
}

export {
    EditBarang,
    DeleteBarang
}