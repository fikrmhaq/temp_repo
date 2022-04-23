
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

const deleteBarang = (data) => {
    return instance.delete('/barang/'+data)
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
    postBarang,
    postDetailBarang,
    deleteCoreBarang,
    deleteBarang
}