import { ADD_TRANSAKSI } from "../.."
import transaksiModel from "../../../models/transaksiModel"

const fetch = (data = null) => {

    return dispatch => {
        transaksiModel.getTransaksi().then(res=>{
            dispatch(add(res.data.responseData.transaksis))
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
    add
}