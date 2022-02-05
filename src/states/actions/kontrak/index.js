import { ADD_KONTRAK } from "../.."
import kontrakModel from "../../../models/kontrakModel"

const fetch = () => {

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


export default {
    getWithDetail,
    add
}