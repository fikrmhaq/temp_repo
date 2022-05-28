import React, { memo, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useControllerState } from '../../../../controllers/Ref'

const addVendor = memo(({ open, toggle }) => {
    const [nama, setNama] = useState(null)
    const { postVendor } = useControllerState()

    const submit = () => {
        postVendor(nama)
        toggle()
    }

    return (
        <Modal toggle={toggle} isOpen={open} centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-2">
                    <h5 className='modal-title my-auto'>Tambah Vendor</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="nama">Nama Vendor</label>
                    <input type="text" name="nama" id="nama" className="form-control" placeholder='Input nama vendor disini'
                        onChange={(ev) => setNama(ev.target.value)}
                    />
                </div>
                <button className="btn btn-primary col-12 mt-3"
                 onClick={submit}
                >Simpan</button>
            </ModalBody>
        </Modal>
    )
})

const EditVendor = memo(({ open, toggle, data }) => {
    const [nama, setNama] = useState(data.nama)
    const { patchVendor } = useControllerState()

    const submit = () => {
        patchVendor({nama, id: data._id})
        toggle()
    }

    return (
        <Modal toggle={toggle} isOpen={open} centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-2">
                    <h5 className='modal-title my-auto'>Edit Vendor</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="nama">Nama Vendor</label>
                    <input type="text" name="nama" id="nama" className="form-control" placeholder='Input nama vendor disini'
                        defaultValue={nama}
                        onChange={(ev) => setNama(ev.target.value)}
                    />
                </div>
                <button className="btn btn-primary col-12 mt-3"
                 onClick={submit}
                >Simpan</button>
            </ModalBody>
        </Modal>
    )
})



const addKT = memo(({ open, toggle }) => {
    const [nama, setNama] = useState(null)
    const { postKategori } = useControllerState()

    const submit = () => {
        postKategori(nama)
        toggle()
    }

    return (
        <Modal toggle={toggle} isOpen={open} centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-2">
                    <h5 className='modal-title my-auto'>Tambah Kategori</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="nama">Nama Kategori</label>
                    <input type="text" name="nama" id="nama" className="form-control" placeholder='Input nama kategori disini'
                        onChange={(ev) => setNama(ev.target.value)}
                    />
                </div>
                <button className="btn btn-primary col-12 mt-3"
                 onClick={submit}
                >Simpan</button>
            </ModalBody>
        </Modal>
    )
})

export {
    addVendor,
    addKT,
    EditVendor
}