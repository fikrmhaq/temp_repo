import React from "react";

import Services from "../../services/Services";
import ModalDenah from "./ModalDenah";
import TambahRuangan from "./TambahRuangan";
import { Nav, NavItem, NavLink, PopoverBody, TabContent, TabPane, UncontrolledPopover } from "reactstrap";
import ModalEdit from "./ModalEdit";

// Component
import { Card, DeleteModal, Pagination, Toast } from "../../components";
import Search from "../../components/Search";
import { Form } from "../components/Form/Form";
import { Dialog } from "../components/Modal/Modal";
import classnames from 'classnames';

class Ruangan extends React.Component {
  constructor(props){
      super(props)
      this.toggle = this.toggle.bind(this); 
    this.state = {
    ruangan: null,

    // Pagination
    pagination: [],

    searchRuangan: null,
    tambahRuangan: false,
    openDenah: "0",
    deleteModal: "0",
    message: {
      message: "",
      error: false,
    },
    editModal: "0",
    _pinjam_: null,
    ruangan_label: null,
    input: {
      atas_nama: null,
      kontak: null,
      keterangan: null,
      tanggal_pinjam: null,
      tanggal_kembali: null,
    },
    activeTab: '1',

  };}

  componentDidMount() {
    if (!localStorage.getItem("logged"))
      window.location.href = "http://192.168.2.16:3000";
    Services.getRuangan().then((res) => {
      this.setState({
        ruangan: res.data.data.sort((a, b) => {
          let x = a.nama_ruangan.toLowerCase();
          let y = b.nama_ruangan.toLowerCase();
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        }),
      });
    });
  }

  getRuanganAgain = (dataRuangan) => {
    this.state.ruangan.push(dataRuangan);
    this.setState({
      ruangan: this.state.ruangan.sort((a, b) => {
        let x = a.nama_ruangan.toLowerCase();
        let y = b.nama_ruangan.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      }),
    });
  };

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e Ini adalah parameter untuk mendefinisi click event
   * @returns {null}
   */
  whenSearch = (e) => {
    var value = e.target.value;
    if (value == "" || value == null)
      return this.setState({ searchRuangan: null }, () => {});
    this.setState(
      {
        searchRuangan: this.state.ruangan.filter(
          (item) =>
            item.nama_ruangan.toLowerCase().indexOf(value.toLowerCase()) > -1
        ),
      },
      () => {}
    );
  };

  /**
   * Ini adalah function untuk menghapus ruangan.
   * Peringatan: jika function ini dijalankan
   * maka ruangan dan semua relasi yang terkait dengan
   * ruangan tersebut akan dihapus!
   * @param {String} id ID ruangan berupa UUID
   */
  deleteRuangan = (id) => {
    Services.getAssetRuangan().then((res) => {
      res.data.data
        .filter((item) => item.id_ruangan == id)
        .forEach((item) => {
          Services.deleteAssetRuangan(item.id_asset_ruangan);
        });
      Services.deleteRuangan(id)
        .then((res) => {
          this.setState({ deleteModal: "0" });
          this.setMessage("Deleted");
          var ruangan = this.state.ruangan.filter(
            (item) => item.id_ruangan != id
          );
          setTimeout(this.setState({ ruangan }), 500);
        })
        .catch((err) => {
          this.setMessage(err, true);
        });
    });
  };

  /**
   * Function ini digunakan untuk mengirim pesan atau notifkasi ke Toast
   * @param {String} message Digunakan untuk mengirim pesan ke Toast
   * @param {Boolean} error Digunakan untuk memberi tau Toast bahwa message berisi error
   */
  setMessage = (message, error = false) => {
    this.setState({ message: { message, error } }, () => {
      setTimeout(
        () => this.setState({ message: { message: "", error: false } }),
        5000
      );
    });
  };

  setPinjamRuangan(id) {
    this.setState({
      _pinjam_: id,
      ruangan_label: this.state.ruangan.find((a) => a.id_ruangan == id)
        .nama_ruangan,
    });
  }

  postPinjam() {
    const { _pinjam_ } = this.state
    const { atas_nama, kontak, keterangan, tanggal_pinjam, tanggal_kembali } =
      this.state.input;

    Services.postCorePeminjaman({
      nama_peminjam: atas_nama,
      kontak_peminjam: kontak,
      keterangan: {data: keterangan},
      tanggal_pinjam,
      tanggal_kembali,
    }).then((res) => {
    const { id_peminjaman } = res.data.data
    
    

    Services.postDetailPeminjaman({
        id_peminjaman,
        id_ruangan:_pinjam_
    }).then(detail=>{
        
    })



    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  /**
   * Ini adalah function untuk re-rendering
   */
  refresh = () => {
    Services.getRuangan().then((res) => {
      this.setState(
        {
          ruangan: res.data.data.sort((a, b) => {
            let x = a.nama_ruangan.toLowerCase();
            let y = b.nama_ruangan.toLowerCase();
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
          }),
        },
        () => {
          this.whenPaginate();
        }
      );
    });
  };

  render() {
    const { ruangan, _pinjam_, input } = this.state;
    return (
      <div className="ruangan">
        <div className="d-flex justify-content-between mb-3">
          <button
            className="btn btn-primary"
            onClick={() =>
              this.setState({ tambahRuangan: !this.state.tambahRuangan })
            }
          >
            Tambah Ruangan
          </button>
          <Search
            className="w-25"
            input={{
              name: "search",
              id: "search",
              onChange: this.whenSearch,
              placeholder: "Search",
            }}
          ></Search>
        </div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Data
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Peminjaman
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="row">
              {this.state.pagination != null
                ? this.state.pagination.map((item) => (
                    <div className="col-lg-6 mb-3">
                      <Card className="card-ruangan">
                        <div className="d-flex">
                          <div className="foto w-25"></div>
                          <div className="w-75 ms-4">
                            <h5>{item.nama_ruangan}</h5>
                            <p>
                              {item.penanggung_jawab} &#9679; Lantai{" "}
                              {item.lantai}
                            </p>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex action">
                                <button className="btn">
                                  <i class="fas fa-info-circle"></i>
                                </button>
                                <button
                                  className="btn"
                                  id={`btn-config-ruangan-${item.id_ruangan}`}
                                >
                                  <i class="fas fa-cog"></i>
                                </button>
                                <UncontrolledPopover
                                  target={`btn-config-ruangan-${item.id_ruangan}`}
                                  className="popover-ruangan"
                                  placement="right"
                                  trigger="focus"
                                >
                                  <PopoverBody className="p-0 px-2 py-1">
                                    <div className="d-flex flex-column">
                                      <button
                                        className="btn"
                                        onClick={() =>
                                          this.setState({
                                            deleteModal: item.id_ruangan,
                                          })
                                        }
                                      >
                                        <i class="fas fa-trash-alt"></i> Hapus
                                      </button>
                                      <hr className="m-0" />
                                      <button
                                        className="btn"
                                        onClick={() =>
                                          this.setState({
                                            editModal: item.id_ruangan,
                                          })
                                        }
                                      >
                                        <i class="fas fa-pen"></i> Edit
                                      </button>
                                    </div>
                                  </PopoverBody>
                                </UncontrolledPopover>
                              </div>
                              <div style={{ display:'flex', flexDirection:'row' }}>
                                {/* <button className="btn btn-primary px-4" onClick={() => this.setState({ openDenah: item.id_ruangan })}>Lihat</button> */}
                                <div class="col my-auto text-success" style={{ marginRight:'10px' }}>
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                      <ModalDenah
                        toggle={() => this.setState({ openDenah: "0" })}
                        isOpen={this.state.openDenah == item.id_ruangan}
                        id_ruangan={item.id_ruangan}
                      ></ModalDenah>
                      <ModalEdit
                        toggle={() => this.setState({ editModal: "0" })}
                        isOpen={this.state.editModal == item.id_ruangan}
                        data={item}
                        message={this.setMessage}
                        refresh={this.refresh}
                      ></ModalEdit>
                      <DeleteModal
                        toggle={() => this.setState({ deleteModal: "0" })}
                        isOpen={this.state.deleteModal == item.id_ruangan}
                        message="Peringatan: Anda akan menghapus ruangan dan relasi unit dengan ruangan!"
                        item={item.nama_ruangan}
                        submit={() => this.deleteRuangan(item.id_ruangan)}
                      ></DeleteModal>
                    </div>
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
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div>
                Peminjaman
            </div>
          </TabPane>
        </TabContent>

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
        ></Toast>
      </div>
    );
  }
}

export default Ruangan;
