import { ADD_DETAIL_KONTRAK, ADD_KONTRAK } from "../.."
import kontrakModel from "../../../models/kontrakModel"
import kontrak_data from '../../sample/kontrak.json'
import detail_kontrak_data from '../../sample/detail_kontrak.json'

const fetch = () => {
    
    return dispatch => {
        dispatch(add(kontrak_data))
    }
}

const fetch_detail = () => {
    
    return dispatch => {
        dispatch(add_detail(detail_kontrak_data))
    }
}

const getWithDetail = () => { // Kontrak With Detail

    return dispatch => {
        kontrakModel.getKontrak().then(core=>{
            let id_kontrak_list = core.data.data.map(a => {
                return a.id_kontrak
            })
            kontrakModel.getDetailKontrak({id_kontrak:id_kontrak_list}).then(detail=>{
                let construct = core.data.data.map(b => {
                    return {
                        ...b,
                        detail_kontrak: detail.data.data.filter(fil => fil.id_kontrak == b.id_kontrak )
                    }
                })
                dispatch(add(construct))
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

const add_detail = (data = []) => {
    return {
        type:ADD_DETAIL_KONTRAK,
        payload:data
    }
}



export default {
    fetch,
    fetch_detail,
    getWithDetail,
    add
}