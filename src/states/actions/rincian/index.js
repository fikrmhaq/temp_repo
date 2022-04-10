import { ADD_RINCIAN } from "../..";
import barangModel from "../../../models/barangModel";
import rincian_data from '../../sample/rincian.json'

const fetch = (data = []) => {
    return dispatch => {
        // barangModel.getRincian(data).then(res => {
        //     dispatch(add(res.data.data))
        // })

        barangModel.getRincian().then(res=>{
            const construct = res.data.responseData.rincians.map(item=>{
                return {id_rincian: item._id, nama_rincian: item.nama_rincian}
            })
            console.log()
            dispatch(add(construct))
            
        })
        
        
    }
}

const add = (data = []) => {
    return {
        type: ADD_RINCIAN,
        payload: data
    }
}

export default {
    fetch,
    add
}