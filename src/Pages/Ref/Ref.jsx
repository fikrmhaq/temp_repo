import React, { memo, useState } from 'react';
import { useRincian, useVendor } from '../../functions/hooks/states';
import Services from '../../services/Services';
import { RefCard } from './components';
import RefContainer from './RefContainer';
import Vendor from './Vendor/Vendor';

// class Ref extends React.Component {
//     state = {
//         total: {
//             vendor: null,
//             supplier: null
//         },
//         active: 0
//     }

//     componentDidMount() {
//         Services.getVendor().then(res => {
//             this.state.total.vendor = res.data.data.length;
//             this.setState({ total: this.state.total });
//         })
//         Services.getSupplier().then(res => {
//             this.state.total.supplier = res.data.data.length;
//             this.setState({ total: this.state.total });
//         })
//     }

//     render() { 
//         return (
//             <div className='ref'>
//                 {!this.state.active && (
//                     <div className='row'>
//                         {Object.keys(this.state.total).map((item, index) => (
//                             <RefContainer title={item} data={this.state.total[item]} clicked={() => this.setState({ active: index + 1 })} />
//                         ))}
//                     </div>
//                 )}
//                 {this.state.active == 1 && (
//                     <Vendor back={() => this.setState({ active: 0 })} />
//                 )}
//             </div>
//         );
//     }
// }

const Ref = memo(() => {
    const [active, setActive] = useState(false)
    const [data, setData] = useState([])
    const [section, setSection] = useState('')

    const kategori = useRincian()
    const vendor = useVendor()

    return (
        <div className='ref'>
            {!active && (
                <div className='row'>
                    {/* {Object.keys(this.state.total).map((item, index) => (
                        <RefContainer title={item} data={this.state.total[item]} clicked={() => this.setState({ active: index + 1 })} />
                    ))} */}
                    <RefContainer title={"Kategori"} data={kategori.length}
                     clicked={() => {
                         setActive(!active)
                         setData(kategori)
                         setSection("Kategori")
                        }}
                    />
                    <RefContainer title={"Vendor"} data={vendor.length}
                     clicked={() => {
                         setActive(!active)
                         setData(vendor)
                         setSection("Vendor")
                        }}
                    />
                </div>
            )}
            {active && (
                <div className='vendor'>
                    <button className="btn btn-primary d-block mb-3" 
                    // onClick={() => this.setState({ tambahVendor: !this.state.tambahVendor })}
                    >Tambah {section}</button>
                    <button className="btn btn-back mb-3" 
                    onClick={() => setActive(!active)}
                    ><i class="fas fa-long-arrow-alt-left"></i> Kembali</button>
                    <div className="row">
                        {data
                        .map(item => (
                            <div className="col-lg-6 mb-3">
                                <RefCard label={section == 'Kategori' ? item.nama_rincian : section == 'Vendor' ? item.nama_vendor : ''} />
                            </div>
                        ))}
                    </div>
                    {/* {this.state.activeData != null && <Pagination data={this.state.activeData} get={(data) => this.setState({ pagination: data })}></Pagination>}
                    <TambahVendor toggle={() => this.setState({ tambahVendor: !this.state.tambahVendor })} isOpen={this.state.tambahVendor} refresh={this.refresh} /> */}
                </div>
            )}
        </div>
    )

})

export default Ref;