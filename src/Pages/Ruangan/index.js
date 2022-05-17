import React, { memo, useState } from 'react'
import { ActionPopover, Card } from '../../components'
import { useAll, useRuangan } from '../../functions/hooks/states'
import { RuanganCard } from './components'
import { TambahRuangan } from './components/dialogs'

export const Ruangan = memo(() => {

    const [tambah, setTambah] = useState(false)


    const Ruangan = useRuangan()
    const All = useAll()

    return (
        <div className="ruangan">
            <div className="d-flex justify-content-between mb-3">
                <button
                    className="btn btn-primary"
                onClick={() =>
                    setTambah(!tambah)
                }
                >
                    Tambah Ruangan
                </button>
                <div className="form-group w-25">
                    <input type="search" name="search" id="search" className="form-control form-search" placeholder="Cari Barang disini"
                    //   onChange={(ev) => setSearch(ev.target.value.toLowerCase())}
                    //  onChange={this.searching}
                    />
                </div>
            </div>
            <div className="row">
                {Ruangan.length != 0
                    ? Ruangan.map((item) => (
                        <RuanganCard 
                        
                        {
                            ...
                            item
                        }
                        
                        />
                    ))
                    : [...Array(10)].map((item) => (
                        <div className="col-lg-6 mb-3">
                            <Card className="card-ruangan">
                                <div className="d-flex">
                                    <div className="foto w-25"></div>
                                    <div className="w-75 ms-4">
                                        <h5 className="placeholder-wave">
                                            <span className="placeholder col-4"></span>
                                        </h5>
                                        <p className="placeholder-wave">
                                            <span className="placeholder col-6"></span>
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex action">
                                                <button className="btn placeholder-wave">
                                                    <span className="placeholder col-12"></span>
                                                </button>
                                                <button className="btn placeholder-wave">
                                                    <span className="placeholder col-12"></span>
                                                </button>
                                            </div>
                                            <div>
                                                <button className="btn btn-primary px-4 placeholder-wave">
                                                    <span className="placeholder col-12"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                    <TambahRuangan toggle={() => setTambah(!tambah)} open={tambah}  />
            </div>
            {/* 
            <Dialog
                open={_pinjam_ != null}
                title={"Meminjam Ruangan " + this.state.ruangan_label}
            >
                {JSON.stringify(input)}
                <div style={{ width: "100%" }}>
                    <Form.Input
                        label="Atas nama"
                        onChange={(ev) =>
                            this.setState({
                                input: { ...input, atas_nama: ev.target.value },
                            })
                        }
                        placeholder="Input nama"
                    />
                    <Form.Input
                        label="Kontak"
                        onChange={(ev) =>
                            this.setState({ input: { ...input, kontak: ev.target.value } })
                        }
                        placeholder="Input kontak"
                    />
                    <Form.Textarea
                        onChange={(ev) =>
                            this.setState({
                                input: { ...input, keterangan: ev.target.value },
                            })
                        }
                        label="Keterangan"
                        placeholder="Input keterangan"
                    />
                    <div class="row">
                        <div class="col-6">
                            <Form.Date
                                label="Tanggal Pinjam"
                                onChange={(ev) =>
                                    this.setState({
                                        input: { ...input, tanggal_pinjam: ev.target.value },
                                    })
                                }
                            />
                        </div>
                        <div class="col-6">
                            <Form.Date
                                label="Tanggal Kembali"
                                onChange={(ev) =>
                                    this.setState({
                                        input: { ...input, tanggal_kembali: ev.target.value },
                                    })
                                }
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => this.postPinjam()}
                                class="btn btn-primary"
                                style={{ width: "100%", color: "white" }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
            <TambahRuangan
                toggle={() =>
                    this.setState({ tambahRuangan: !this.state.tambahRuangan })
                }
                isOpen={this.state.tambahRuangan}
                callback={this.getRuanganAgain}
            ></TambahRuangan>
            {this.state.ruangan != null && (
                <Pagination
                    data={
                        this.state.searchRuangan == null
                            ? this.state.ruangan
                            : this.state.searchRuangan
                    }
                    get={(data) => this.setState({ pagination: data })}
                ></Pagination>
            )}
            <Toast
                message={this.state.message.message}
                error={this.state.message.error}
            ></Toast> */}
        </div>
    )
})

