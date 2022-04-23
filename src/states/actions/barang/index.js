import { ADD_BARANG } from "../.."
import barangModel from "../../../models/barangModel"
import kontrakModel from "../../../models/kontrakModel"
import vendor from "./vendor"
import barang_data from '../../sample/barang.json'
import core from './core'

const fetch = () => {
    return (dispatch, getState) => {

        // This procedure must only works when the app request all data at once from the server
        const { core, barang } = getState() 
        
        if(barang.length == 0){
            barangModel.getBarang().then(res=>{

                dispatch(add(res.data.responseData.barangs))
             
            })
        }

        // End Procedure

        
    }
}

const post = (data = null) => {
    return dispatch => {

        const { id_barang, jumlah } = data

        for(var i = 0;i<jumlah;i++){
            barangModel.postBarang({ id_barang, keterangan: null }).then(res=>{
                // console.log(res)
                dispatch(add(res.data.responseData.barang))
            })
        }

        
        
    }
}

const getByDetailKontrak = (data) => {
    return dispatch => {
        barangModel.getCoreBarang({
            id_detail_kontrak: data
        })
        .then(res=>{
            
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
    getByDetailKontrak,
    add,
    post,
    vendor
}