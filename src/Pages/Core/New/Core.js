import React, { memo, useState } from "react";
import { Card } from "reactstrap";
import { useBarang, useCoreBarang, useDetailKontrak, useKontrak, useRincian, useVendor } from "../../../functions/hooks/states";
import { Barang } from "../components/barang";
// import Kontrak from "../Kontrak";
import { Kontrak } from '../components/kontrak'
import TambahDokumen from '../TambahDokumen'
import TambahCore from "../TambahCore";
import { useControllerState } from "../../../controllers/Core";
import { TambahBarang } from '../components/dialog'
import { IfUndefined } from "../../../functions/catcher";

const Core = memo(() => {
  const [mode, setMode] = useState(1);
  const [id_kontrak, setIdKontrak] = useState(null)
  const [Filter, setFilter] = useState(['a'])

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



  const rincian = useRincian()
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
      <div style={mode == 1 ? {} : { display: "none" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <button className="btn btn-primary"
              onClick={() => setTambahBarang(!tambahBarang)}
            // onClick={() => _tambahBarang()}
            >Tambah Barang</button>
            <TambahBarang
              toggle={() => setTambahBarang(!tambahBarang)}
              open={tambahBarang}
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
                    jumlah: barang.filter(a => a.id_barang == sheet.id_barang).length,
                    vendor: IfUndefined(vendor.find(a => a.id_vendor == sheet.id_vendor), '', 'nama'),
                    rincian_asset: IfUndefined(rincian.find(a => a.id_rincian == sheet.id_rincian), [], 'nama_rincian')
                  }
                  }
                />;
              })}
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card">
              <Card>
                <div class="row">
                  <div
                    class="card-label"
                    style={{ marginLeft:'10px' }}
                  >Kategori Barang</div>
                </div>
                <ul>
                  {
                    rincian.map(item => {
                      return (
                        <div className="form-group form-check mb-2">
                          <input type="checkbox" name="checkbox" className="form-check-input" />
                          <label>{item.nama_rincian}</label>
                        </div>
                      )
                    })
                  }
                  {/* {
                    Filter..map(item => {
                      return
                    })
                  } */}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Core;
