import React, { memo } from 'react'
import Kontrak from '../Kontrak';


const Core = memo(() => {
    const kontrak = [
        {
            ba_penerimaan_barang: "12312312312",
            created_date: "2021-12-21T04:00:12.253Z",
            id_jenis_kontrak: 1,
            id_kontrak: "kontrak1",
            id_sumber_anggaran: 3,
            id_supplier: "f75c8f2d-2ca6-40e6-8c7c-6f53ec6afa8f",
            instansi_id: "2c2e010a-3560-4a00-8469-e7f3d3490a23",
            last_update: "2021-12-21T04:00:12.253Z",
            nilai_kontrak: 200000,
            nomor_kontrak: "12312312312",
            tanggal_ba_penerimaan_barang: "2020-10-02"
        }
    ]

    const detail_kontrak = [
        {
            created_date: null,
            harga_satuan: "19000",
            id_detail_kontrak: "detailkontrak1",
            id_kontrak: "kontrak1",
            jenis_satuan: "1",
            jumlah: 10,
            last_update: null,
            nama_aset: "asdfasdfasdf",
            spesifikasi: "Tes"
        },
        {
            created_date: null,
            harga_satuan: "19000",
            id_detail_kontrak: "detailkontrak2",
            id_kontrak: "kontrak1",
            jenis_satuan: "1",
            jumlah: 10,
            last_update: null,
            nama_aset: "asdfasdfasdf",
            spesifikasi: "Tes"
        }
    ]

    const barang = [
        {
            created_date: "2022-02-03T11:05:26.730Z",
            id_barang: "65140dac-93df-44fa-96d4-c303e320f1f1",
            id_detail_barang: "38969f8f-ef4e-41a2-8984-0f2f287b9550",
            id_detail_kontrak: "detailkontrak1",
            id_rincian_asset: "132100102002",
            id_vendor: "d99ef356-1fc4-4e3a-a7d5-872a0a68e497",
            keterangan: null,
            nama_barang: "ROG",
            nama_vendor: "Datas",
            rincian_asset: "Lap Top"
        }
    ]


    return (
        <div>

            <div class="row">
                {
                    kontrak.map((item, i) => {
                        return (
                            <Kontrak 
                            data={item} 
                            // changeKontrak={() => this.setState({ kontrak_id: item.id_kontrak, kontrak: !this.state.kontrak, kontrak_data: item })} 
                            // rincian_asset={this.state.rincian_asset != null ? this.state.rincian_asset[item.id_kontrak] : 'Loading...'} 
                            // refresh={this.refreshDokumen} 
                            // refreshEdit={this.refreshDokumenEdit} 
                            // message={this.setMessage}
                            />
                        )
                    })
                }
            </div>
        </div>
    )

})

export default Core