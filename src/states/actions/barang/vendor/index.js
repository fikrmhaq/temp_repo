import { ADD_VENDOR } from "../../..";
import barangModel from "../../../../models/barangModel";

const fetch = (data = []) => {
    return dispatch => {
        barangModel.getVendor().then(res=>{
            dispatch(add(res.data.data))
        })
    }
}


const add = (data = []) => {
    return {
        type:ADD_VENDOR,
        payload:data
    }
}

export default {
    fetch,
    add
}