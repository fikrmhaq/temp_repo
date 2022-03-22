import { ADD_BARANG } from "../.."
import barangModel from "../../../models/barangModel"
import kontrakModel from "../../../models/kontrakModel"
import vendor from "./vendor"
import barang_data from '../../sample/barang.json'
import core from './core'

const fetch = () => {
    return dispatch => {
        // barangModel.getCoreBarang().then(res=>{
        //     // console.log(res)
        //     dispatch(add(res.data.data))
        // })

        dispatch(add(barang_data))
    }
}

const post = (data = null) => {
    return dispatch => {

        const { barang } = data

        // barangModel.postBarang({ ...barang, id_rincian_asset: '100000000000' }).then(res=>{  == OLD ROUTE
        //     kontrakModel.postDetailKontrak({
        //         ...detail,
        //         id_barang: res.data.data.id_barang,
        //         id_kontrak
        //     }).then(kontrak => {
        //         // console.log(res)
        //         dispatch(add([res.data.data]))
        //         // console.log(kontrak)
        //     })
        // })

        const { nama_barang, harga, jumlah, id_vendor } = barang

        var construct_core_barang = {
            nama_barang,
            harga,
            id_vendor,
            id_barang: 'barang3',
            id_rincian: 'a'
        }

        
        dispatch(core.add([construct_core_barang]))

        var temp = []
        for(var i = 0;i<jumlah;i++) {
            temp.push(
                {
                    id_barang: 'barang3',
                    id_detail_barang: 'detail_barang1',
                    keterangan: null
                }
            )
        }


        dispatch(add(temp))
        
    }
}

const getByDetailKontrak = (data) => {
    return dispatch => {
        barangModel.getCoreBarang({
            id_detail_kontrak: data
        })
        .then(res=>{
            
            dispatch(add(res.data.data))
        })
    }
}


const add = (data = []) => {
    return {
        type:ADD_BARANG,
        payload:data
    }
}




export {
    fetch,
    getByDetailKontrak,
    add,
    post,
    vendor
}