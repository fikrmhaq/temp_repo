import React, { useState, } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { Fragment } from 'react';
import '../../index.css'

const Modals = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
    }

    const [title, setTitle] = useState([
        {
            parent: ''
        }
    ])

    const addParent = () => {
        setTitle([...title, { parent: '' }])
    }

    const minusParent = (e, i) => {
        const state = [...title]
        state.splice(i, 1)
        setTitle(state)
    }

    return (

        <div className="d-flex">
            <Button color="primary" onClick={toggle} className="shadow-none my-auto mb-3 mb-lg-auto"><i className="fas fa-plus"></i> Add Transaction</Button>

            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader toggle={toggle}>Transaksi</ModalHeader>

                <ModalBody>
                    <div className="form-group"><Input type="text" className="my-3" placeholder="Merk" rows={1} /></div>
                    <div className="form-group"><Input type="text" className="my-3" placeholder="Supplier" rows={1} /></div>
                    <div className="form-group"><Input type="text" className="my-3" placeholder="Vendor" rows={1} /></div>
                    <div className="form-group"><Input type="text" className="my-3" placeholder="Spesifikasi" rows={1} /></div>
                    <div className="form-group"><Input type="text" className="my-3" placeholder="Tanggal Kontrak" rows={1} /></div>
                    <div className="form-group"><Input type="text" className="my-3" placeholder="Tanggal Barang Masuk" rows={1} /></div>
                    <div className="form-group"> <Input type="text" className="my-3" placeholder="Jumlah" rows={1} /></div>



                    {
                        title.map((data, i) => {

                            return (

                                <Fragment key={i}>

                                    <div className="row">
                                        <div className="col-lg-6 form-group">
                                            <input type="text" className="my-3 form-control" placeholder="Mac Address" />
                                        </div>
                                        <div className="col-lg-6 d-inline-flex p-1 form-group">

                                            <input type="text" className="my-3 form-control me-3" placeholder="Serial Number" />
                                            {
                                                i === 0 ? (
                                                    <div className="">
                                                        <button className="btn btn-primary ms-auto d-block my-3 shadow-none" onClick={addParent} ><i className="fa fa-plus"></i></button>
                                                    </div>) : (
                                                    <div className="">
                                                        <button className="btn btn-primary ms-auto d-block my-3 shadow-none" onClick={(e) => minusParent(e, i)} ><i className="fa fa-minus"></i></button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>


                                </Fragment>
                            )
                        })
                    }



                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={toggle} className="shadow-non">Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle} className="shadow-none">Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );

}


export default Modals
