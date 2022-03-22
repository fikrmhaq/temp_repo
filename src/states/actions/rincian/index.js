import { ADD_RINCIAN } from "../..";
import barangModel from "../../../models/barangModel";
import rincian_data from '../../sample/rincian.json'

const fetch = (data = []) => {
    return dispatch => {
        // barangModel.getRincian(data).then(res => {
        //     dispatch(add(res.data.data))
        // })

        dispatch(add(rincian_data))
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