import { ADD_CORE_BARANG, DELETE_CORE_BARANG, EDIT_CORE_BARANG } from '../../..'
import barangModel from '../../../../models/barangModel'
import core_barang_data from '../../../sample/core_barang.json'
import { post as barang_post } from '..'

const fetch = () => {
    return (dispatch, getState) => {

        // This procedure must only works when the app request all data at once from the server
        const { core, barang } = getState()

        if (core.length == 0) {
            barangModel.getCoreBarang().then(res => {
                var construct = res.data.responseData.coreBarangs.map(item => {
                    return {...item, harga: item.harga.toString()}
                })
                dispatch(add(construct))
            })
        }


        // End Procedure


    }
}

const post = (data) => {
    return (dispatch) => {

        var dat = data.barang

        var construct = { img: dat.img, nama: dat.nama_barang, id_vendor: dat.id_vendor, id_rincian: dat.id_rincian, harga: parseInt(dat.harga.split(',').join('')), jumlah: dat.jumlah }

        let form = new FormData()

        form.append('img', construct.img)
        form.append('nama', construct.nama)
        form.append('vendor', construct.id_vendor)
        form.append('rincians', construct.id_rincian)
        form.append('harga', construct.harga)


        barangModel.postCoreBarang(form).then(res => {

            const { _id } = res.data.responseData.core_barang

            // var construct = res.data.responseData.coreBarangs
            dispatch(barang_post({ id_barang: _id, jumlah: construct.jumlah }))
            dispatch(add(res.data.responseData.core_barang))
        })
    }
}

const edit = (data) => {
    return (dispatch) => {

        
        const { id, nama_barang, id_vendor, id_rincian, harga } = data

        let form = new FormData()

        // form.append('img', construct.img)
        form.append('nama', nama_barang)
        form.append('vendor', id_vendor)
        // form.append('rincians', id_rincian)
        form.append('harga', parseInt(harga.split(',').join('')))

        for (var i = 0; i < id_rincian.length; i++) {
            form.append('rincians[]', id_rincian[i]);
          }


        barangModel.editCoreBarang({id, items: form}).then(res=>{
            const data = res.data.responseData.core_barang


            dispatch(replace({_id: id, items: [data]}))

        })
    }
}

const del = (data) => {
    return (dispatch, getState) => {

        const { core, barang } = getState()
        
        barangModel.deleteCoreBarang(data).then(res => {

            const { _id } = res.data.responseData.core_barang

            
            barang.filter(a=> a.id_barang == _id).map(item => {
                barangModel.deleteBarang(item._id).then(res => {

                })
            })

            // var temp = {
            //     harga: 150,
            //     id_rincian: "12",
            //     id_vendor: "624bf25f5bec9780d0a72439",
            //     img_path: "https://files.catbox.moe/xbmx41.png",
            //     nama_barang: "Dell",
            //     __v: 0,
            //     _id: "625cdd74795fde35f7e71bd3"
            // }

            dispatch(dump(res.data.responseData.core_barang))
        })
    }
}

const add = (data = []) => {
    return {
        type: ADD_CORE_BARANG,
        payload: data
    }
}

const replace = (data = []) => {
    return{
        type: EDIT_CORE_BARANG,
        payload: data
    }
}

const dump = (data) => {
    return {
        type: DELETE_CORE_BARANG,
        payload: data
    }
}

export default {
    fetch,
    post,
    edit,
    add,
    del,
    replace,
    dump
}