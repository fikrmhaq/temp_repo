import { ADD_CORE_BARANG, DELETE_CORE_BARANG } from '../../..'
import barangModel from '../../../../models/barangModel'
import core_barang_data from '../../../sample/core_barang.json'
import { post as barang_post } from '..'

const fetch = () => {
    return (dispatch, getState) => {

        // This procedure must only works when the app request all data at once from the server
        const { core, barang } = getState() 
        
        if(core.length == 0){
            barangModel.getCoreBarang().then(res=>{
                var construct = res.data.responseData.coreBarangs
                dispatch(add(construct))
            })
        }


        // End Procedure
  

    }
}

const post = (data) => {
    return dispatch => {

        var dat = data.barang

        var construct = { img: dat.img, nama: dat.nama_barang, id_vendor: dat.id_vendor, id_rincian: "12", harga: parseFloat(dat.harga), jumlah: dat.jumlah }

        let form = new FormData()

        form.append('img', construct.img)
        form.append('nama', construct.nama)
        form.append('vendor', construct.id_vendor)
        form.append('rincian', construct.id_rincian)
        form.append('harga', construct.harga)


        barangModel.postCoreBarang(form).then(res=>{

            const { _id } = res.data.responseData.core_barang
      
            // var construct = res.data.responseData.coreBarangs
            dispatch(barang_post({ id_barang: _id, jumlah: construct.jumlah }))
            dispatch(add(res.data.responseData.core_barang))
        })
    }
}

const del = (data) => {
    return dispatch => {
        barangModel.deleteCoreBarang(data).then(res=>{
            dispatch(dump(data))
        })
    }
}

const add = (data = []) => {
    return {
        type:ADD_CORE_BARANG,
        payload:data
    }
}

const dump = (data) => {
    return {
        type:DELETE_CORE_BARANG,
        payload:data
    }
}

export default {
    fetch,
    post,
    add,
    del
}