import React, { memo, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { useBarang, useCoreBarang, useDetailKontrak, useKontrak, useRincian, useVendor } from "../../../functions/hooks/states";
import { Barang } from "../components/barang";
// import Kontrak from "../Kontrak";
import { Kontrak } from '../components/kontrak'
import TambahDokumen from '../TambahDokumen'
import TambahCore from "../TambahCore";
import { useControllerState } from "../../../controllers/Core";
import { DeleteBarang, TambahBarang } from '../components/dialog'
import { IfUndefined } from "../../../functions/catcher";
import { usePaginate } from "../../../functions/hooks";
import { PaginateComponent } from "../components";
import { Grow } from "@material-ui/core";

const Core = memo(() => {
  const [mode, setMode] = useState(1);
  const [id_kontrak, setIdKontrak] = useState(null)
  const [Filter, setFilter] = useState([])
  const rincian = useRincian()
  const core_barang = useCoreBarang()
  const [index, setIndex, data] = usePaginate(core_barang, 6)
  const [search, setSearch] = useState("")

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
  const [Delete, setDelete] = useState(false)
  const [item, setItem] = useState({ id: null, nama_Barang: null })

  const { postBarang } = useControllerState()



  
  const vendor = useVendor()
  const kontrak = useKontrak()
  const detail_kontrak = useDetailKontrak()
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

  const check_filter = (id) => {
    if (Filter.includes(id)) return setFilter(Filter.filter(el => el != id))
    setFilter([...Filter, id])



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
                  vendor,
                  Filter
                }
              }
            />
          </div>
          <div className="form-group w-25">
            <input type="search" name="search" id="search" className="form-control form-search" placeholder="Cari Barang disini"
              onChange={(ev) => setSearch(ev.target.value.toLowerCase())}
            //  onChange={this.searching}
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-9">
            <div class="row">
              {core_barang
                .filter(a => a.nama_barang.toLowerCase().includes(search))
                .filter(a => Filter.every(v => a.id_rincian.includes(v))).map((sheet, i) => {
                  const {id_vendor, harga} = sheet
                  return (<><Barang.DataCard
                    {
                    ...
                    {
                      ...sheet,
                      jumlah: barang.filter(a => a.id_barang == sheet._id).length,
                      vendor: IfUndefined(vendor.find(a => a.id_vendor == sheet.id_vendor), '', 'nama_vendor'),
                      // rincian_asset: IfUndefined(rincian.find(a => a.id_rincian == sheet.id_rincian), [], 'nama_rincian'),
                      rincian_asset: IfUndefined(rincian.find(a => a.id_rincian == sheet.id_rincian.filter(a=> rincian.map(b=> { return b.id_rincian }).includes(a))[0]), [], 'nama_rincian'),
                      id_rincians: sheet.id_rincian.filter(a=> rincian.map(b=> { return b.id_rincian }).includes(a)),
                      id_vendor,
                      harga,
                      _delete: (item) => {
                        setDelete(!Delete)
                        setItem(item)
                      }
                    }
                    }
                  /></>);
                })}

            </div>
            {/* <div style={{ margin: 'auto', width: '33%', marginTop: '10px' }}>
              <PaginateComponent indexes={data.data} index={data.now_page} setIndex={(i) => setIndex(i)}  />
            </div> */}
          </div>
          <div class="col-lg-3">
            <div class="card">
              <Card>
                <div class="row">
                  <div
                    class="card-label"
                    style={{ marginLeft: '10px' }}
                  >Kategori Barang</div>
                </div>
                <ul>
                  {
                    rincian.map(item => {
                      return (
                        <div className="form-group form-check mb-2">
                          <input type="checkbox" name="checkbox" className="form-check-input" checked={Filter.includes(item.id_rincian)} onClick={() => check_filter(item.id_rincian)} />
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
