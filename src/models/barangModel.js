
import { instance } from "./indexModel";

const getCoreBarang = (data = null) => {
    return instance.get('/core-barang', {
        params: data
    })
}

const deleteCoreBarang = (data) => {
    return instance.delete('/core-barang/'+data)
}

const getBarang = (data = null) => {
    return instance.get('/barang', {
        params: data
    })
}



const getVendor = (data = null) => {
    return instance.get('/vendor', {
        params: data
    })
}

const getRincian = (data = null) => {
    return instance.get(`/rincian`)
}

const postCoreBarang = (data = null) => {
    return instance.post('/core-barang', data)
}

const postBarang = (data = null) => {
    return instance.post('/barang', data)
}

const postKategori = (data = null) => {
    return instance.post('/rincian', {nama:data})
}

const postVendor = (data = null) => {
    return instance.post('/vendor', {nama:data})
}

const editVendor = (data = null, id) => {
    return instance.put('/vendor/'+id, data)
}

const editCoreBarang = (data = null) => {
    const { id, items } = data
    return instance.put('/core-barang/'+ id, items)
}

const deleteBarang = (data) => {
    return instance.delete('/barang/'+data)
}

const deleteKategori = (data = null) => {
    return instance.delete('/rincian/'+data)
}

const deleteVendor = (data = null) => {
    return instance.delete('/vendor/'+data)
}



const postDetailBarang = (data) => {
    return instance.post('/detail_barang', data)
}

export default {
    getCoreBarang,
    getBarang,
    getVendor,
    getRincian,
    postCoreBarang,
    editCoreBarang,
    postBarang,
    postDetailBarang,
    postKategori,
    postVendor,
    editVendor,
    deleteCoreBarang,
    deleteBarang,
    deleteKategori,
    deleteVendor
}