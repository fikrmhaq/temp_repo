import { ADD_VENDOR, DELETE_VENDOR, EDIT_VENDOR } from "../../..";
import barangModel from "../../../../models/barangModel";
import vendor_data from '../../../sample/vendor.json'

const fetch = (data = []) => {
    return (dispatch, getState) => {
        
        const { vendor } = getState()

        if(vendor.length == 0){
            barangModel.getVendor().then(res=>{
                const construct = res.data.responseData.vendors.filter(a=> a.updatedAt != null).map(item=>{
                    return {id_vendor: item._id, nama_vendor: item.nama_vendor, updatedAt: item.updatedAt, createdAt: item.createdAt}
                })
                dispatch(add(construct))
              })
        }

        
    }
}

const post = (data = null) => {
    return (dispatch) => {

        barangModel.postVendor(data).then(res=>{
            const { _id, nama_vendor, updatedAt, createdAt } = res.data.responseData.vendor
            dispatch(add([{id_vendor: _id, nama_vendor, updatedAt, createdAt}]))
        })
    }
}

const del = (data = null) => {
    return dispatch => {
        barangModel.deleteVendor(data).then(res=>{
            dispatch(remove({_id:data}))
        })
    }
}

const edit = (data = null) => {
    return (dispatch) => {

        const { nama, id } = data

        barangModel.editVendor({nama}, id).then(res=>{
            const { _id, nama_vendor, updatedAt, createdAt } = res.data.responseData.vendor
            dispatch(replace({_id:id, items:[{id_vendor: _id, nama_vendor, updatedAt, createdAt}]}))
        })
    }
}


const add = (data = []) => {
    return {
        type:ADD_VENDOR,
        payload:data
    }
}

const replace = (data = null) => {
    return {
        type:EDIT_VENDOR,
        payload:data
    }
}




const remove = (data = null) => {
    return {
        type:DELETE_VENDOR,
        payload:data
    }
}

export default {
    fetch,
    post,
    del,
    edit,
    replace,
    add
}