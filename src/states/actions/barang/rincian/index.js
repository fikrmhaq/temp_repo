import { ADD_RINCIAN } from '../../..'
import rincian_data from '../../../sample/rincian.json'

const fetch = () => {
    return dispatch => {
        // barangModel.getCoreBarang().then(res=>{
        //     // console.log(res)
        //     dispatch(add(res.data.data))
        // })

        dispatch(add(rincian_data))
    }
}

const add = (data = []) => {
    return {
        type:ADD_RINCIAN,
        payload:data
    }
}

export default {
    fetch,
    add
}