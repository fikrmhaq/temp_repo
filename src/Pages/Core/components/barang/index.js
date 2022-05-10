import React, { useState } from "react";
import { ActionPopover, Card } from "../../../../components";
import { DeleteBarang, EditBarang } from "../dialog";

const DataCard = ({
  img_path,
  id_barang,
  _id,
  nama_barang,
  vendor,
  jumlah,
  rincian_asset,
  id_detail_kontrak,

  index,
  supplier,
  id_rincians,
  id_vendor,
  harga,
  edit,
  _delete
}) => {
  const item = { _id, nama_barang, vendor, jumlah, rincian_asset, id_detail_kontrak, id_barang, id_rincians, id_vendor, harga };

  const [Edit, setEdit] = useState(false)
  const [Delete, setDelete] = useState(false)
  // const [Item, setItem] = useState({ id: null, nama_Barang: null })


  return (
    <>
    <div className="col-lg-4 core-barang mb-4" key={index}>
      <Card>
        <div className="foto">
          {/* <img
            src={img_path == "" ? require("../../Default.png").default : img_path}
            alt="Default.png"
            width="50%"
          />
           */}
                   
          <div class={img_path == "" ? "noimg" : "withimg"}>
          <img
            
            src={img_path == "" ? require("../../Default.png").default : img_path}
            alt="Default.png"
            width="50%"
            
          />
          </div>
          
        </div>
        <div className="px-4 py-3">
          <h5>{nama_barang}</h5>
          <h6>
            {vendor} <span>&#9679;</span> {rincian_asset} <span>&#9679;</span>{" "}
            {jumlah} Unit
          </h6>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <button
                className="btn"

                // onClick={() => info()}
              >
                <i class="fas fa-info-circle"></i>
              </button>
              <ActionPopover
                target={`btn-trigger-${id_barang}`}
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
            {/* <h6 className="my-auto">
              {this.state.supplier != null
                ? this.state.supplier.find(
                    (item1) => item1.id_supplier == this.props.data.id_supplier
                  ).nama_supplier
                : "Loading..."}
            </h6> */}
          </div>
        </div>
      </Card>
    </div>
    <EditBarang open={Edit} item={item} toggle={() => setEdit(!Edit)} />
    <DeleteBarang open={Delete} toggle={() => setDelete(!Delete)} item={item} />
    </>
  );
};

export const Barang = {
  DataCard,
};
