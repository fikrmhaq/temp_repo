import { ActionPopover, Card } from "../../../components"




const RefCard = ({ label }) => {

    return (
        <Card>
            <div className='d-flex px-2 justify-content-between vendor-card'>
                <div>
                    <h5>{label}</h5>
                    <h6>27 November 2021 &#9679; 27 November 2021</h6>
                </div>
                <div className='my-auto'>
                    {/* <button className="btn" onClick={() => this.setState({ info: item.id_vendor })}><i class="fas fa-info-circle"></i></button> */}
                    <ActionPopover
                        target={`btn-trigger-`}
                        trigger="focus"
                        placement="right"
                        // _delete={() =>
                        //     setDelete(!Delete)
                        // }
                        // _edit={() =>
                        //     setEdit(!Edit)
                        // }
                    ></ActionPopover>
                    {/* <ActionPopover target={`btn-settings-${item.id_vendor}`} placement='right' delete={() => this.setState({ delete: item.id_vendor })} edit={() => this.setState({ edit: item.id_vendor })}></ActionPopover> */}
                </div>
            </div>
            {/* <Info toggle={() => this.setState({ info: '0' })} isOpen={this.state.info == item.id_vendor} data={item} />
            <DeleteModal toggle={() => this.setState({ delete: '0' })} isOpen={this.state.delete == item.id_vendor} message="Apakah anda yakin ingin menghapus" item={item.nama}></DeleteModal>
            <EditVendor toggle={() => this.setState({ edit: '0' })} isOpen={this.state.edit == item.id_vendor} data={item} refresh={this.refresh}></EditVendor> */}
        </Card>
    )
}

export {
    RefCard
}