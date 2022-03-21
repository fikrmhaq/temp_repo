import React, { memo, useState } from "react";
import { Card } from "reactstrap";
import { useBarang, useCoreBarang, useDetailKontrak, useKontrak, useVendor } from "../../../functions/hooks/states";
import { Barang } from "../components/barang";
// import Kontrak from "../Kontrak";
import { Kontrak } from '../components/kontrak'
import TambahDokumen from '../TambahDokumen'
import TambahCore from "../TambahCore";
import { useControllerState } from "../../../controllers/Core";
import { TambahBarang } from '../components/dialog'

const Core = memo(() => {
  const [mode, setMode] = useState(1);
  const [id_kontrak, setIdKontrak] = useState(null)

  const [input, setInput] = useState(
    {
      kontrak: {
        nomor_kontrak: '',
        id_jenis_kontrak: '1',
        id_sumber_anggaran: '1',
        nilai_kontrak: '',
        ba_penerimaan_barang: '',
        tanggal_ba_penerimaan_barang: '',
        id_supplier: '',
      }
    }
  )

  const [tambahDokumen, setTambahDokumen] = useState(false)
  const [tambahBarang, setTambahBarang] = useState(false)

  const { postBarang } = useControllerState()

  const vendor = useVendor()
  const kontrak = useKontrak()
  const detail_kontrak = useDetailKontrak()
  const core_barang = useCoreBarang()
  const barang = useBarang()
  

  const _tambahBarang = () => {
    postBarang(
      {
        created_date: "2022-02-03T11:05:26.730Z",
        id_barang: "65140dac-93df-44fa-96d4-c303e320f1f1",
        id_detail_barang: "38969f8f-ef4e-41a2-8984-0f2f287b9550",
        id_detail_kontrak: "detailkontrak1",
        id_rincian_asset: "132100102002",
        id_vendor: "d99ef356-1fc4-4e3a-a7d5-872a0a68e497",
        keterangan: null,
        nama_barang: "Dell",
        nama_vendor: "Datas",
        rincian_asset: "Lap Top"
      }
    )
  }

  return (
    <div>
      <div style={mode == 0 ? {} : { display: "none" }}>
        <TambahDokumen
          open={tambahDokumen}
          toggle={() => setTambahDokumen(!tambahDokumen)}
          // submit={this.submitKontrak}  
          input={input.kontrak}
        // changeKontrak={this.changeKontrak}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary mb-3"
            onClick={() => setTambahDokumen(!tambahDokumen)}
            
          //  submit={this.submitKontrak}
          >Tambah Dokumen</button>
          {/* <Search className="w-25" select={{ name: 'dokumen', id: "dokumen", onChange: this.changeDokumen, children: this.state.dokumen != null ? this.state.dokumen.map(item => ({ key: item.id_jenis_kontrak, value: item.nama_jenis })) : ([{ key: 'null', value: 'Loading...' }]) }} input={{ name: 'searchDokumen', id: "searchDokumen", placeholder: 'Search', onChange: this.whenSearch }}></Search> */}
        </div>
        <div class="row">
          {kontrak.map((item, i) => {
            return (
              <Kontrak.DataCard
                // data={item}
                {
                ...
                {
                  ...item,
                  action: (id) => {
                    setIdKontrak(id)
                    setMode(1)
                  }
                }
                }
              // changeKontrak={() => this.setState({ kontrak_id: item.id_kontrak, kontrak: !this.state.kontrak, kontrak_data: item })}
              // rincian_asset={this.state.rincian_asset != null ? this.state.rincian_asset[item.id_kontrak] : 'Loading...'}
              // refresh={this.refreshDokumen}
              // refreshEdit={this.refreshDokumenEdit}
              // message={this.setMessage}
              />
            );
          })}
        </div>
      </div>

      <div style={mode == 1 ? {} : { display: "none" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <button className="btn btn-primary" 
            // onClick={() => setTambahBarang(!tambahBarang)}
            onClick={() => _tambahBarang()}
            >Tambah Barang</button>
            {/* <TambahCore 
            toggle={() => setTambahBarang(!tambahBarang)} 
            open={tambahBarang} 
            data={
              {
                vendor
              }
            }
            // kontrak={this.props.idKontrak} 
            // submit={(barang, detail) => { this.submitBarang(barang, detail, this.props.idKontrak) }}
            /> */}
            <TambahBarang
            open={false}
            data={
              {
                vendor
              }
            }
            />
          </div>
          {/* <div className="form-group w-25">
            <input type="search" name="search" id="search" className="form-control form-search" placeholder="Cari Barang disini" onChange={this.searching} />
          </div> */}
        </div>
        <div class="row mt-3">
          <div class="col-lg-9">
            <div class="row">
              {core_barang.map((sheet, i) => {
                return <Barang.DataCard 
                {
                  ...
                  { 
                    ...sheet,
                    jumlah: barang.filter(a=> a.id_barang == sheet.id_barang).length,
                    vendor: vendor.find(a=> a.id_vendor == sheet.id_vendor).nama
                  }
                }
                 />;
              })}
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card">
              <Card>Kategori Barang</Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Core;
