import React, { memo, useState, useEffect } from 'react'
import { Card } from '../../components'
import { date_format } from '../../functions'
import { useTransaksi } from '../../functions/hooks/states'



export const Transaksi = () => {

    const transaksi = useTransaksi()

    return (
        <div className="transaksi">
            <div className="d-flex justify-content-between mb-4">
                <button 
                // onClick={() => this.setState({ _pinjam_: !_pinjam_ })}
                 className="btn btn-primary">Tambah Transaksi</button>
                <div className="d-flex w-25">
                    <div className="form-group w-25">
                        <select name="type" id="type" className="form-select form-search">
                            <option value="0">Semua</option>
                        </select>
                    </div>
                    <div className="form-group ms-2 w-75">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            className="form-control form-search"
                            placeholder="Cari disini"
                            // onChange={this.searching}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                {transaksi.map((item) => {
                    const status_pinjam = ["tersedia","masih pinjam","kembali"][item.status_pinjam - 1]

                    return (
                        <div className="col-lg-6 mb-4 transaksi-item">
                        <Card>
                            <div
                                className="d-grid px-2 py-1"
                                style={{ gridTemplateColumns: "40% 25% 25% 10%" }}
                            >
                                <div className="title">
                                    <h5>{item.nama}</h5>
                                    <p className="m-0">
                                    {date_format(item.tanggal_pinjam)} &#9679; {date_format(item.tanggal_kembali)}
                                    </p>
                                </div>
                                <div className="d-flex asset">
                                    <h5 className="my-auto">Komputer</h5>
                                </div>
                                <div className="d-flex status">
                                    <div className="my-auto">
                                        <h5
                                            className={
                                                "m-0 " +
                                                (status_pinjam == "kembali"
                                                    ? "text-success "
                                                    : "") +
                                                (status_pinjam == "masih pinjam"
                                                    ? "text-danger "
                                                    : "") +
                                                (status_pinjam == "tersedia"
                                                    ? "text-primary"
                                                    : "")
                                            }
                                        >
                                            {status_pinjam}
                                        </h5>
                                        <p className="m-0">status</p>
                                    </div>
                                </div>
                                <div className="d-flex action">
                                    <div className="my-auto ms-auto">
                                        <button className="btn">
                                            <i class="fas fa-info-circle"></i>
                                        </button>
                                        <button className="btn">
                                            <i class="fas fa-cog"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                 
                )
                })}
            </div>
            {/* {this.state.data != null && (
          <Pagination
            data={
              this.state.dataSearch == null
                ? this.state.data
                : this.state.dataSearch
            }
            get={(data) => this.setState({ pagination: data })}
          ></Pagination>
        )} */}
            {/* <Dialog open={_pinjam_} title="Tambah Peminjaman" >
          <div style={{ width: "100%" }}>
            <Form.Input label="Atas nama" placeholder="Input nama" />
            <Form.Input label="Kontak" placeholder="Input kontak" />
            <Form.Textarea label="Keterangan" placeholder="Input keterangan" />
            <Form.ListSelection

            label="Barang"
            data={barang.map((item, i)=> {
                return { label:item.nama_barang, value:item.id_barang }
            })}

            />
            <div class="row">
              <div class="col-6">
                <Form.Date label="Tanggal Pinjam" />
              </div>
              <div class="col-6">
                <Form.Date label="Tanggal Kembali" />
              </div>
            </div>
          </div>
        </Dialog> */}
        </div>
    )
}