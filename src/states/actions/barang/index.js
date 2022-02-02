import { ADD_BARANG } from "../.."
import barangModel from "../../../models/barangModel"

const fetch = () => {
    return dispatch => {
        barangModel.getCoreBarang().then(res=>{
            // console.log(res)
            dispatch(add(res.data.data))
        })
    }
}


const add = (data = []) => {
    return {
        type:ADD_BARANG,
        payload:data
    }
}




export {
    fetch,
    add
}