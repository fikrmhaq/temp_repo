import React, { memo, useEffect, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { Form } from "../../../components/Form"
import { Dialog } from '../../../components/Modal'
import Cleave from 'cleave.js/react';
import { useBarang, useCoreBarang } from '../../../../functions/hooks/states';
import { IfUndefined } from '../../../../functions/catcher';
import { useControllerState } from '../../../../controllers/Transaksi';
import { DeleteDialog } from '../../../components/Modal/Modal';

export const TambahTransaksi = memo(({ open, toggle }) => {

    const { postTransaksi } = useControllerState()


    const [input, setInput] = useState(
        {
            id_barang: null,
            nama: null,
            tanggal_pinjam: null,
            tanggal_kembali: null
        }
    )

    const barang = useBarang()
    const core = useCoreBarang()

    const submit = () => {
        postTransaksi(input)
        toggle()
    }


    return (
        <Dialog.Form title="Tambah Transaksi" open={open} toggle={toggle} onSubmit={submit} >
            <div className="form-group mb-2">
                <Form.Text
                    label="Nama Peminjam"
                    onChange={ev => setInput({ ...input, nama: ev.target.value })}
                />
            </div>

            <div className="row mb-2">
                <div className="form-group col-lg-6">
                    <Form.Date
                        label="Tanggal Pinjam"
                        onChange={ev => setInput({ ...input, tanggal_pinjam: ev.target.value })}
                    />
                </div>
                <div className="form-group col-lg-6">
                    <Form.Date
                        label="Tanggal Kembali"
                        onChange={ev => setInput({ ...input, tanggal_kembali: ev.target.value })}
                    />
                </div>
            </div>
            <div className="form-group mb-2">
                <Form.Select
                    label="Barang"
                    onChange={(value) => setInput({ ...input, id_barang: value })}
                    value={input.id_barang}
                    options={
                        barang
                            .filter(el => core.find(a => a._id == el.id_barang) != undefined)
                            .map(item => {

                                return {
                                    label: core.find(a => a._id == item.id_barang).nama_barang,
                                    value: item._id
                                }


                            })
                    }
                />
            </div>
        </Dialog.Form>
    )

})

export const EditTransaksi = memo(({ open, toggle, data }) => {

    const { postTransaksi, editTransaksi } = useControllerState()


    const [input, setInput] = useState(
        {
            
        }
    )

    const barang = useBarang()
    const core = useCoreBarang()

    const submit = () => {
        editTransaksi({...input, _id: data._id})
        toggle()
    }

    useEffect(() => {
        setInput({
            id_barang: data.id_barang,
            nama: data.nama,
            tanggal_pinjam: data.tanggal_pinjam,
            tanggal_kembali: data.tanggal_kembali,
            status_pinjam: data.status_pinjam
        })
    }, [data])


    return (
        <Dialog.Form title="Edit Transaksi" open={open} toggle={toggle} onSubmit={submit} >
            <div className="form-group mb-2">
                <Form.Text
                    label="Nama Peminjam"
                    defaultValue={data.nama}
                    onChange={ev => setInput({ ...input, nama: ev.target.value })}
                />
            </div>

            <div className="row mb-2">
                <div className="form-group col-lg-6">
                    <Form.Date
                        label="Tanggal Pinjam"
                        defaultValue={data.tanggal_pinjam}
                        onChange={ev => setInput({ ...input, tanggal_pinjam: ev.target.value })}
                    />
                </div>
                <div className="form-group col-lg-6">
                    <Form.Date
                        label="Tanggal Kembali"
                        defaultValue={data.tanggal_kembali}
                        onChange={ev => setInput({ ...input, tanggal_kembali: ev.target.value })}
                    />
                </div>
            </div>
            <div className="form-group mb-2">
                <Form.Select
                    label="Barang"
                    onChange={(value) => setInput({ ...input, id_barang: value })}
                    value={input.id_barang}
                    options={
                        barang
                            .filter(el => core.find(a => a._id == el.id_barang) != undefined)
                            .map(item => {

                                return {
                                    label: core.find(a => a._id == item.id_barang).nama_barang,
                                    value: item._id
                                }


                            })
                    }
                />
            </div>
            <div className="form-group mb-2">
                <Form.ClassicSelect
                    label="Status Peminjaman"
                    onChange={(ev) => setInput({...input, status_pinjam: ev.target.value})}
                    options={
                        [
                            {
                                label:"Tersedia",
                                value:1
                            },
                            {
                                label:"Masih Pinjam",
                                value:2
                            },
                            {
                                label:"Kembali",
                                value:3
                            }
                        ]
                    }
                />
            </div>
        </Dialog.Form>
    )

})

export const DeleteTransaksi = (({ open, toggle, id }) => {

    const { deleteTransaksi } = useControllerState()
    
    return <DeleteDialog { ... { open, toggle } }
    nama={"Peminjaman "+id}
    onSubmit={() => deleteTransaksi(id)}
    />

})