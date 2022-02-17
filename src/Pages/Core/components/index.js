import { useSearch } from "../../../functions/hooks"
import { Form } from "../../components/Form/Form"


const KategoriBarang = ({ history_id, rincian_asset, nextLapisan }) => {



    return (
        <div className="kategori-container">
            <label htmlFor="kategori">Kategori</label>
            <p className='m-0'>Memasukan barang ke “{history_id[history_id.length - 1] == 100000000000 ? 'Asset' : (typeof rincian_asset[rincian_asset.length - 2] != 'undefined' && rincian_asset[rincian_asset.length - 2].find(item => item.id_rincian_asset == history_id[history_id.length - 1]).rincian_asset)}”</p>
            <div className="kategori-isi py-3">
                {rincian_asset.length > 0 ? (
                    <ul>
                        {rincian_asset[0].map(item => (
                            <>
                                <li>
                                    <div className="form-check">
                                        <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => nextLapisan(item.id_rincian_asset, 1)} checked={item.id_rincian_asset == history_id[1]} />
                                        <label htmlFor="check" className='form-check-label'>{item.rincian_asset}</label>
                                    </div>
                                </li>
                                {typeof history_id[1] != 'undefined' && history_id[1] == item.id_rincian_asset && (
                                    <ul>
                                        {rincian_asset[1] != null && rincian_asset[1].map(item1 => (
                                            <li>
                                                <>
                                                    <div className="form-check">
                                                        <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => nextLapisan(item1.id_rincian_asset, 2)} checked={item1.id_rincian_asset == history_id[2]} />
                                                        <label htmlFor="check" className='form-check-label'>{item1.rincian_asset}</label>
                                                    </div>
                                                    {typeof history_id[2] != 'undefined' && history_id[2] == item1.id_rincian_asset && (
                                                        <ul>
                                                            {rincian_asset[2] != null && rincian_asset[2].map(item2 => (
                                                                <li>
                                                                    <>
                                                                        <div className="form-check">
                                                                            <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => nextLapisan(item2.id_rincian_asset, 3)} checked={item2.id_rincian_asset == history_id[3]} />
                                                                            <label htmlFor="check" className='form-check-label'>{item2.rincian_asset}</label>
                                                                        </div>
                                                                        {typeof history_id[3] != 'undefined' && history_id[3] == item2.id_rincian_asset && (
                                                                            <ul>
                                                                                {rincian_asset[3] != null && rincian_asset[3].map(item3 => (
                                                                                    <li>
                                                                                        <>
                                                                                            <div className="form-check">
                                                                                                <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => nextLapisan(item3.id_rincian_asset, 4)} checked={item3.id_rincian_asset == history_id[4]} />
                                                                                                <label htmlFor="check" className='form-check-label'>{item3.rincian_asset}</label>
                                                                                            </div>
                                                                                            {typeof history_id[4] != 'undefined' && history_id[4] == item3.id_rincian_asset && (
                                                                                                <ul>
                                                                                                    {rincian_asset[4] != null && rincian_asset[4].map(item4 => (
                                                                                                        <li>
                                                                                                            <>
                                                                                                                <div className="form-check">
                                                                                                                    <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => nextLapisan(item4.id_rincian_asset, 5)} checked={item4.id_rincian_asset == history_id[5]} />
                                                                                                                    <label htmlFor="check" className='form-check-label'>{item4.rincian_asset}</label>
                                                                                                                </div>
                                                                                                                {typeof history_id[5] != 'undefined' && history_id[5] == item4.id_rincian_asset && (
                                                                                                                    <ul>
                                                                                                                        {rincian_asset[5] != null && rincian_asset[5].map(item5 => (
                                                                                                                            <li>
                                                                                                                                <>
                                                                                                                                    <div className="form-check">
                                                                                                                                        <input type="checkbox" name="check" id="check" className="form-check-input" onChange={() => nextLapisan(item5.id_rincian_asset, 6)} checked={item5.id_rincian_asset == history_id[6]} />
                                                                                                                                        <label htmlFor="check" className='form-check-label'>{item5.rincian_asset}</label>
                                                                                                                                    </div>

                                                                                                                                </>
                                                                                                                            </li>
                                                                                                                        ))}
                                                                                                                    </ul>
                                                                                                                )}
                                                                                                            </>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            )}
                                                                                        </>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ))}
                    </ul>
                ) : 'Loading...'}
            </div>
        </div>
    )

}

const Vendor = ({ dataVendor = [], dataSearchVendor = [], id_vendor, vendorSearch, onChange }) => {    

    return (
        <Form.Selection onChange={onChange} list={
            dataVendor.data.map(item=> {
                return {...item, id: item.id_vendor}
            })
        } />
    )
}

// const Unit = ({ onChange }) => {
    


//     return (
//         <Form.Selection onChange={onChange} list={
//             dataVendor.data.map(item=> {
//                 return {...item, id: item.id_vendor}
//             })
//         } />
//     )
// }

export {
    KategoriBarang,
    Vendor
}