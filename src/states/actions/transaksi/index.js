import { ADD_TRANSAKSI, DELETE_TRANSAKSI, EDIT_TRANSAKSI } from "../.."
import transaksiModel from "../../../models/transaksiModel"

const fetch = (data = null) => {

    return (dispatch, getState) => {
        
        const { transaksi } = getState()

        if(transaksi.length == 0) {
            transaksiModel.getTransaksi().then(res=>{
                dispatch(add(res.data.responseData.transaksis))
            })
        }

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

            dispatch(
                replace({ _id, items: [res.data.responseData.transaksi] })
            )
        })
    }
}

const del = (id = null) => {
    

    return dispatch => {
        transaksiModel.deleteTransaksi(id).then(res=>{

            dispatch(
                remove(id)
            )

        })
    }

}


const add = (data = []) => {

    return {
        type: ADD_TRANSAKSI,
        payload: data

    }

}

const replace = (data = []) => {

    return {
        type: EDIT_TRANSAKSI,
        payload: data
    }

}

const remove = (id = null) => {

    return {
        type: DELETE_TRANSAKSI,
        payload: id
    }

}

export default {
    fetch,
    post,
    patch,
    replace,
    remove,
    add,
    del
}