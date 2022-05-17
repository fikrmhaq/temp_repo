import ruanganModel from "../../../models/ruanganModel"
import { ADD_RUANGAN } from '../../'

const fetch = (data = null) => {


    return dispatch => {
        ruanganModel.getRuangan().then(res=>{
            dispatch(add(res.data.responseData.ruangans))
        })
    }


}


const add = (data = []) => {

    return {
        type:ADD_RUANGAN,
        payload:data
    }
}


export default {
    fetch,
    add
}