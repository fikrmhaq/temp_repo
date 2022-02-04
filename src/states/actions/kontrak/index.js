import { ADD_KONTRAK } from "../.."
import kontrakModel from "../../../models/kontrakModel"

const fetch = () => {

}

const getWithDetail = () => { // Kontrak With Detail

    return dispatch => {
        kontrakModel.getKontrak().then(core=>{
            kontrakModel.getDetailKontrak().then(detail=>{
                
            })
        })
    }
}

const add = (data = []) => {
    return {
        type:ADD_KONTRAK,
        payload:data
    }
}