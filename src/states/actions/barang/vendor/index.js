import { ADD_VENDOR } from "../../..";
import barangModel from "../../../../models/barangModel";
import vendor_data from '../../../sample/vendor.json'

const fetch = (data = []) => {
    return dispatch => {
        // barangModel.getVendor().then(res=>{
        //     dispatch(add(res.data.data))
        // })
        dispatch(add(vendor_data))
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