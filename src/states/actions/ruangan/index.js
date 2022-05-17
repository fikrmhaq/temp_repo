import ruanganModel from "../../../models/ruanganModel"
import { ADD_RUANGAN } from '../../'

const fetch = (data = null) => {


    return (dispatch, getState) => {
        const { ruangan } = getState()
        

        if(ruangan.length == 0) {
            ruanganModel.getRuangan().then(res=>{
                dispatch(add(
                    res.data.responseData.ruangans.filter(a=> a.keterangan.split('').includes("{"))
                    .map(b=> {
                        return {...b, keterangan: JSON.parse(b.keterangan)}
                    })
                    ))
            })
        }
    }


}

const post = (data = null) => {

    return dispatch => {

        const { nama_ruangan, penanggung_jawab, lantai, keterangan } = data


        let form = new FormData()
        form.append('nama', nama_ruangan)
        form.append('keterangan', JSON.stringify({ penanggung_jawab, lantai, keterangan }))

        ruanganModel.postRuangan(form).then(res=>{
            dispatch(add([{...res.data.responseData.ruangan, keterangan: JSON.parse(res.data.responseData.ruangan.keterangan)}]))
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
    post,
    add
}