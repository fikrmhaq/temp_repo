import React from "react";
import { ActionPopover, Card } from "../../../../components";

const DataCard = ({
  id_barang,
  nama_barang,
  vendor,
  jumlah,
  rincian_asset,

  index,
  supplier,
}) => {
  const item = { id_barang, nama_barang, vendor, jumlah, rincian_asset };

  return (
    <div className="col-lg-4 core-barang mb-4" key={index}>
      <Card>
        <div className="foto">
          <img
            src={require("./Default.png").default}
            alt="Default.png"
            width="50%"
          />
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
                onClick={() =>
                  this.setState({
                    info: !this.state.info,
                    dataInfo: item,
                  })
                }
              >
                <i class="fas fa-info-circle"></i>
              </button>
              <button className="btn" id={`btn-trigger-${id_barang}`}>
                <i class="fas fa-cog"></i>
              </button>
              <ActionPopover
                target={`btn-trigger-${id_barang}`}
                trigger="focus"
                placement="right"
                delete={() =>
                  this.setState({
                    deleteModal: !this.state.deleteModal,
                    deleteData: item,
                  })
                }
                edit={() =>
                  this.setState({
                    editCore: !this.state.editCore,
                    dataEdit: item,
                  })
                }
              ></ActionPopover>
            </div>
            <h6 className="my-auto">
              {this.state.supplier != null
                ? this.state.supplier.find(
                    (item1) => item1.id_supplier == this.props.data.id_supplier
                  ).nama_supplier
                : "Loading..."}
            </h6>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Barang = {
  DataCard,
};
