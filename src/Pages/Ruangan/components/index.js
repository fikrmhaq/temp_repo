import React, { memo, useState } from 'react'
import { ActionPopover, Card } from '../../../components'
import { useControllerState } from '../../../controllers/Ruangan'
import { DeleteRuangan, EditRuangan } from './dialogs'


export const RuanganCard = memo(({ nama, keterangan, _id }) => {

    const [Edit, setEdit] = useState(false)
    const [Delete, setDelete] = useState(false)

    const { deleteRuangan } = useControllerState()
    

    return (
        <div className="col-lg-6 mb-3">
            <Card className="card-ruangan">
                <div className="d-flex">
                    <div className="foto w-25"></div>
                    <div className="w-75 ms-4">
                        <h5>{nama}</h5>
                        <p>
                            {keterangan.penanggung_jawab} &#9679; Lantai{" "}
                            {keterangan.lantai}
                        </p>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <button
                                    className="btn"

                                // onClick={() => setDetail(!Detail)}
                                >
                                    <i class="fas fa-info-circle"></i>
                                </button>
                                <ActionPopover
                                    // target={`btn-trigger-${id_barang}`}
                                    trigger="focus"
                                    placement="right"
                                _delete={() =>
                                    setDelete(!Delete)
                                }
                                _edit={() =>
                                    setEdit(!Edit)
                                }
                                ></ActionPopover>
                            </div>
                            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <button className="btn btn-primary px-4" onClick={() => this.setState({ openDenah: item.id_ruangan })}>Lihat</button>
                                <div class="col my-auto text-success" style={{ marginRight: '10px' }}>
                                    Tersedia
                                </div>
                                <button
                                    className="btn btn-primary px-4"
                                onClick={() =>
                                    this.setPinjamRuangan(item.id_ruangan)
                                }
                                >
                                    Jadwalkan
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Card>
            <EditRuangan open={Edit} toggle={() => setEdit(!Edit)} data={{nama, keterangan, _id}}  />
            <DeleteRuangan open={Delete} toggle={() => setDelete(!Delete)} nama={nama} onSubmit={() => deleteRuangan(_id)}  />
        </div> 
    )
})