
import { instance } from "./indexModel";

const getCoreBarang = (data = null) => {
    return instance.get('/barang', {
        params: data
    })
}

const postDetailBarang = (data) => {
    return instance.post('/detail_barang', data)
}

export default {
    getCoreBarang,
    postDetailBarang
}