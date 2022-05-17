import React, { memo, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { Form } from '../../../components/Form'


export const TambahRuangan = memo(({ toggle, open }) => {

    const [input, setInput] = useState(
        {
            nama_ruangan: null,
            penanggung_jawab: null,
            lantai: null,
            keterangan: null
        }
    )


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
                        onChange={ ev=> setInput({...input, penanggung_jawab: ev.target.value}) }
                        />
                    </div>
                    <div className="form-group col-lg-5">
                        <label htmlFor="penanggung_jawab">Lantai</label>
                        <Cleave options={{ numericOnly: true }} className='form-control' placeholder='Input lantai disini' value={this.state.dataInput.lantai} onChange={(e) => this.changeSubmit('lantai', e.target.rawValue)}></Cleave>
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="keterangan">Keterangan</label>
                    <textarea name="keterangan" id="keterangan" rows="3" className="form-control" placeholder='Input keterangan disini' value={this.state.dataInput.keterangan} onChange={(e) => this.changeSubmit('keterangan', e.target.value)}></textarea>
                </div>
                <button className="btn btn-primary col-12 mt-3" 
                // onClick={this.submit}
                >Simpan</button>
            </ModalBody>
        </Modal>
    )
})