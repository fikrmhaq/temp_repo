import { ADD_RINCIAN, DELETE_RINCIAN } from "../..";
import barangModel from "../../../models/barangModel";
import rincian_data from '../../sample/rincian.json'

const fetch = (data = []) => {
    return (dispatch, getState) => {
        // barangModel.getRincian(data).then(res => {
        //     dispatch(add(res.data.data))
        // })

        const { rincian } = getState()

        if(rincian.length == 0){
            barangModel.getRincian().then(res=>{
                const construct = res.data.responseData.rincians.filter(a=> a.updatedAt != null).filter(a=> a.nama_rincian != null).map(item=>{
                    return {id_rincian: item._id, nama_rincian: item.nama_rincian, updatedAt: item.updatedAt, createdAt: item.createdAt}
                })
                dispatch(add(construct))
                
            })
        }
        
        
    }
}

const post = (data = null) => {
    return (dispatch) => {

        barangModel.postKategori(data).then(res=>{
            const { _id, nama_rincian, updatedAt, createdAt } = res.data.responseData.rincian
            dispatch(add([{id_rincian: _id, nama_rincian: nama_rincian, updatedAt, createdAt}]))
        })
    }
}

const del = (data = null) => {
    return dispatch => {
        barangModel.deleteKategori(data).then(res=>{
            dispatch(remove({_id:data}))
        })
    }
}

const add = (data = []) => {
    return {
        type: ADD_RINCIAN,
        payload: data
    }
}

const remove = (data = null) => {
    return {
        type: DELETE_RINCIAN,
        payload: data
    }
}

export default {
    fetch,
    post,
    remove,
    del,
    add
}