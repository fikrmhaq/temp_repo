import { useState } from "react"
import { ActionPopover, Card } from "../../../components"
import { useControllerState } from "../../../controllers/Ref"
import { date_format } from "../../../functions"
import { DeleteDialog } from "../../components/Modal/Modal"
import { EditVendor } from "./dialog"




const RefCard = ({ id, label, date, _delete, section }) => {
    const [editVendor, setEditVendor] = useState(false)
    const [delModal, setDelModal] = useState(false)


    const Delete = () => {
        _delete(id)
    }

    return (
        <Card>
            <div className='d-flex px-2 justify-content-between vendor-card'>
                <div>
                    <h5>{label}</h5>
                    <h6>{date_format(date.create)} &#9679; {date_format(date.update)} </h6>
                </div>
                <div className='my-auto'>
                    {/* <button className="btn" onClick={() => this.setState({ info: item.id_vendor })}><i class="fas fa-info-circle"></i></button> */}
                    <ActionPopover
                        target={`btn-trigger-`}
                        trigger="focus"
                        placement="right"
                        _delete={() =>
                            setDelModal(!delModal)
                        }
                        _edit={() =>
                            {
                                console.log(section)
                                if(section == 'Vendor'){
                                    setEditVendor(!editVendor)
                                }
                            }
                        }
                    ></ActionPopover>
                    {/* <ActionPopover target={`btn-settings-${item.id_vendor}`} placement='right' delete={() => this.setState({ delete: item.id_vendor })} edit={() => this.setState({ edit: item.id_vendor })}></ActionPopover> */}
                </div>
            </div>
            <DeleteDialog
             toggle={() => setDelModal(!delModal)}
              open={delModal} message="Apakah anda yakin ingin menghapus" nama={label}
              onSubmit={Delete}
              />
            <EditVendor
            toggle={() => setEditVendor(!editVendor)}
            open={editVendor}
            data={{_id:id,nama:label}}
            />
            {/* <Info toggle={() => this.setState({ info: '0' })} isOpen={this.state.info == item.id_vendor} data={item} />
            <DeleteModal toggle={() => this.setState({ delete: '0' })} isOpen={this.state.delete == item.id_vendor} message="Apakah anda yakin ingin menghapus" item={item.nama}></DeleteModal>
            <EditVendor toggle={() => this.setState({ edit: '0' })} isOpen={this.state.edit == item.id_vendor} data={item} refresh={this.refresh}></EditVendor> */}
        </Card>
    )
}

export {
    RefCard
}