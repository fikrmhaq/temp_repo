import React, { memo, useState } from "react";
import { Card } from "reactstrap";
import { useKontrak } from "../../../functions/hooks/states";
import { Barang } from "../components/barang";
import Kontrak from "../Kontrak";

const Core = memo(() => {
  const [mode, setMode] = useState(0);


  const kontrak = useKontrak()

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
      spesifikasi: "Tes",
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
      spesifikasi: "Tes",
    },
  ];

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
      rincian_asset: "Lap Top",
    },
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
      rincian_asset: "Lap Top",
    },
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
      rincian_asset: "Lap Top",
    },
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
      rincian_asset: "Lap Top",
    },
  ];

  return (
    <div>
      <div style={mode == 0 ? {} : { display: "none" }}>
        <div class="row">
          {kontrak.map((item, i) => {
            return (
              <Kontrak
                data={item}
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
        <div class="row mt-3">
          <div class="col-lg-9">
            <div class="row">
              {barang.map((sheet, i) => {
                return <Barang.DataCard {...sheet} />;
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
