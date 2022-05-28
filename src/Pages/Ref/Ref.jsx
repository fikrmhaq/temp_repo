import React, { memo, useState } from 'react';
import { useRincian, useVendor } from '../../functions/hooks/states';
import Services from '../../services/Services';
import { RefCard } from './components';
import RefContainer from './RefContainer';
import Vendor from './Vendor/Vendor';
import { addVendor as DaddVendor, addKT as DaddKategori } from './components/dialog';
import { useControllerState } from '../../controllers/Ref';


const Ref = memo(() => {
    const [active, setActive] = useState(false)
    const [data, setData] = useState([])
    const [section, setSection] = useState('')
    const [addVendor, setAddVendor] = useState(false)
    const [addKategori, setAddKategori] = useState(false)
    const { deleteKategori, deleteVendor } = useControllerState()

    const kategori = useRincian()
    const vendor = useVendor()

    const Delete = (id) => {
        if(section == 'Kategori'){
            deleteKategori(id)
            return
        }
        deleteVendor(id)

    }

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
                    onClick={() => {
                        if(section == 'Kategori'){
                            setAddKategori(!addKategori)
                        }else{
                            setAddVendor(!addVendor)
                        }
                    }}
                    >Tambah {section}</button>
                    <button className="btn btn-back mb-3" 
                    onClick={() => setActive(!active)}
                    ><i class="fas fa-long-arrow-alt-left"></i> Kembali</button>
                    <div className="row">
                        {(section == 'Kategori' ? kategori : vendor)
                        .filter(a=> !Object.values(a).includes(null))
                        .map(item => (
                            <div className="col-lg-6 mb-3">
                                <RefCard 
                                id={section == 'Kategori' ? item.id_rincian : item.id_vendor} 
                                label={section == 'Kategori' ? item.nama_rincian : section == 'Vendor' ? item.nama_vendor : ''} 
                                date={{create:item.createdAt,update:item.updatedAt}}
                                section={section}
                                _delete={(id) => Delete(id)}
                                  />
                            </div>
                        ))}
                    </div>
                    {/* {this.state.activeData != null && <Pagination data={this.state.activeData} get={(data) => this.setState({ pagination: data })}></Pagination>}
                    <TambahVendor toggle={() => this.setState({ tambahVendor: !this.state.tambahVendor })} isOpen={this.state.tambahVendor} refresh={this.refresh} /> */}
                </div>
            )}
            <DaddVendor toggle={() => setAddVendor(!addVendor)} open={addVendor}  />
            <DaddKategori
             toggle={() => setAddKategori(!addKategori)}
             open={addKategori}  />
        </div>
    )

})

export default Ref;