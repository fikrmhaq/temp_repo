import Cleave from 'cleave.js/react';
import React, { memo, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useControllerState } from '../../../../controllers/Ruangan';
import { Form } from '../../../components/Form'
import { DeleteDialog } from '../../../components/Modal/Modal';


export const TambahRuangan = memo(({ toggle, open }) => {

    const [input, setInput] = useState(
        {
            nama_ruangan: null,
            penanggung_jawab: null,
            lantai: null,
            keterangan: null
        }
    )

    const { postRuangan } = useControllerState()



    const submit = () => {
        postRuangan(input)
        toggle()
    }


    return (
        <Modal toggle={toggle} isOpen={open} centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="modal-title my-auto">Tambah Ruangan</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                <div className="form-group mb-2">
                    <Form.Text
                        label="Nama Ruangan"
                        onChange={ev => setInput({ ...input, nama_ruangan: ev.target.value })}
                    />
                </div>

                <div className="row mb-2">
                    <div className="form-group col-lg-7">
                        <Form.Text
                            label="Penanggung Jawab"
                            onChange={ev => setInput({ ...input, penanggung_jawab: ev.target.value })}
                        />
                    </div>
                    <div className="form-group col-lg-5">
                        <label htmlFor="penanggung_jawab">Lantai</label>
                        <Cleave options={{ numericOnly: true }} className='form-control' placeholder='Input lantai disini'
                            onChange={ev => setInput({ ...input, lantai: ev.target.rawValue })}
                        ></Cleave>
                    </div>
                </div>
                <div className="form-group mb-2">
                    <Form.Textarea
                        label="Keterangan"
                        onChange={ev => setInput({ ...input, keterangan: ev.target.value })}
                    />
                </div>
                <button className="btn btn-primary col-12 mt-3"
                    onClick={submit}
                >Simpan</button>
            </ModalBody>
        </Modal>
    )
})

export const EditRuangan = memo(({ open, toggle, data }) => {

    const { editRuangan } = useControllerState()
    
    const [input, setInput] = useState(
        {
            nama_ruangan: data.nama,
            penanggung_jawab: data.keterangan.penanggung_jawab,
            lantai: data.keterangan.lantai,
            keterangan: data.keterangan.keterangan
        }
    )

    const submit = () => {
        editRuangan({ ...input, _id: data._id })
        toggle()
    }

    return (
        <Modal toggle={toggle} isOpen={open} centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="modal-title my-auto">Tambah Ruangan</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                <div className="form-group mb-2">
                    <Form.Text
                        label="Nama Ruangan"
                        defaultValue={input.nama_ruangan}
                        onChange={ev => setInput({ ...input, nama_ruangan: ev.target.value })}
                    />
                </div>

                <div className="row mb-2">
                    <div className="form-group col-lg-7">
                        <Form.Text
                            label="Penanggung Jawab"
                            defaultValue={input.penanggung_jawab}
                            onChange={ev => setInput({ ...input, penanggung_jawab: ev.target.value })}
                        />
                    </div>
                    <div className="form-group col-lg-5">
                        <label htmlFor="penanggung_jawab">Lantai</label>
                        <Cleave defaultValue={input.lantai} options={{ numericOnly: true }} className='form-control' placeholder='Input lantai disini'
                            onChange={ev => setInput({ ...input, lantai: ev.target.rawValue })}
                        ></Cleave>
                    </div>
                </div>
                <div className="form-group mb-2">
                    <Form.Textarea
                        label="Keterangan"
                        defaultValue={input.keterangan}
                        onChange={ev => setInput({ ...input, keterangan: ev.target.value })}
                    />
                </div>
                <button className="btn btn-primary col-12 mt-3"
                    onClick={submit}
                >Simpan</button>
            </ModalBody>
        </Modal>
    )
})

export const DeleteRuangan = memo(({ open, toggle, nama, onSubmit }) => {

    
    
    return <DeleteDialog {... { open, toggle, nama, onSubmit }}  />
})