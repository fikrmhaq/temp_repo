import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import { Vendor } from '..'
import { useVendor } from '../../../../functions/hooks/states'
import { Form } from '../../../components/Form/Form'
import { Dialog } from '../../../components/Modal/Modal'

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

export {
    EditBarang
}