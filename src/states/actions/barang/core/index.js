import { ADD_CORE_BARANG } from '../../..'
import core_barang_data from '../../../sample/core_barang.json'

const fetch = () => {
    return dispatch => {
        // barangModel.getCoreBarang().then(res=>{
        //     // console.log(res)
        //     dispatch(add(res.data.data))
        // })

        dispatch(add(core_barang_data))
    }
}

const add = (data = []) => {
    return {
        type:ADD_CORE_BARANG,
        payload:data
    }
}

export default {
    fetch,
    add
}