import { instance } from "./indexModel";

const getKontrak = (data = null) => {
    return instance.get('/core_kontrak', {
        params:data
    })
}

const getDetailKontrak = (data = null) => {
    return instance.get('/detail_kontrak', {
        params:data
    })
}

export default {
    getKontrak,
    getDetailKontrak
}
