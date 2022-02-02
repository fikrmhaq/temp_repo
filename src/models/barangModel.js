
import { instance } from "./indexModel";

const getCoreBarang = (data = null) => {
    return instance.get('/barang', {
        params: data
    })
}

export default {
    getCoreBarang
}