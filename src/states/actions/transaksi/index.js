import { ADD_TRANSAKSI } from "../.."
import transaksiModel from "../../../models/transaksiModel"

const fetch = (data = null) => {

    return dispatch => {
        transaksiModel.getTransaksi().then(res=>{
            dispatch(add(res.data.responseData.transaksis))
        })
    }

}

const post = (data = null) => {
    return dispatch => {
        transaksiModel.postTransaksi(data).then(res=>{
            dispatch(add(res.data.responseData.transaksi))
        })
    }
}

const patch = (data = null) => {
    return dispatch => {
        
        const { id_barang, nama, tanggal_pinjam, tanggal_kembali, status_pinjam, _id } = data

        transaksiModel.editTransaksi({ id_barang, nama, tanggal_pinjam, tanggal_kembali, status_pinjam },_id).then(res=>{

        })
    }
}


const add = (data = []) => {

    return {
        type: ADD_TRANSAKSI,
        payload: data

    }

}

export default {
    fetch,
    post,
    patch,
    add
}