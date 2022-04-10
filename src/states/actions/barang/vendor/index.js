import { ADD_VENDOR } from "../../..";
import barangModel from "../../../../models/barangModel";
import vendor_data from '../../../sample/vendor.json'

const fetch = (data = []) => {
    return dispatch => {
        barangModel.getVendor().then(res=>{
          const construct = res.data.responseData.vendors.map(item=>{
              return {id_vendor: item._id, nama_vendor: item.nama_vendor}
          })
          dispatch(add(construct))
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