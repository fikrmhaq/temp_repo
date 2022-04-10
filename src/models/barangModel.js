
import { instance } from "./indexModel";

const getCoreBarang = (data = null) => {
    return instance.get('/barang', {
        params: data
    })
}

const postBarang = (data = null) => {
    return instance.post('/core_barang', data)
}

const getVendor = (data = null) => {
    return instance.get('/vendor', {
        params: data
    })
}

const getRincian = (data = null) => {
    return instance.get(`/rincian`)
}

const postDetailBarang = (data) => {
    return instance.post('/detail_barang', data)
}

export default {
    getCoreBarang,
    getVendor,
    getRincian,
    postBarang,
    postDetailBarang
}