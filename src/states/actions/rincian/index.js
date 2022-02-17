import { ADD_RINCIAN } from "../..";
import barangModel from "../../../models/barangModel";

const fetch = (data = []) => {
    return dispatch => {
        barangModel.getRincian(data).then(res => {
            dispatch(add(res.data.data))
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