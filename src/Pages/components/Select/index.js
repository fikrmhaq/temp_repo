const InputSelection = ({ title, option, checked = [], onChange }) => {
    return (
        <div className="detail-container">
            <div className="d-flex justify-content-between">
                <div className="mt-auto">
                    {title}
                </div>
                <div>
                    <button className="btn btn-primary btn-sm"
                    // onClick={() => this.setState({ vendor: !this.state.vendor })}
                    >+</button>
                </div>
            </div>
            {/* <Collapse
            // isOpen={this.state.vendor}
            >
                <div className="d-flex pt-3">
                    <div className="form-group w-100">
                        <input type="text" name="vendor" id="vendor" className="form-control" placeholder="Vendor"
                        // onChange={(e) => { this.changeVendor('nama', e.target.value) }}
                        //  value={this.state.inputVendor.nama}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary ms-3 btn-sm"
                        // onClick={this.newVendor}
                        ><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </Collapse> */}
            <div className="detail px-2 py-3 mt-3 rounded-3 mb-3">
                {/* <div className="form-group">
                    <input type="text" name="search" id="search" className="form-control" placeholder="Search"
                    // onChange={this.vendorSearch}
                    />
                </div> */}
                
                <ul className="nav flex-column mt-3 px-1">
                    {
                        option.map(item => {
                            return (
                                <li>
                                    <div className="form-check">
                                        <input type="checkbox" name="check" id="check" className="form-check-input" checked={checked.includes(item.value)} onChange={() => onChange(item.value)} />
                                        <label htmlFor="check" className='form-check-label'>{item.label}</label>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export {
    InputSelection
}