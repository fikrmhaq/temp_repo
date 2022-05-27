import { instance } from './indexModel'





const getRuangan = (data = null) => {
    return instance.get('/ruangan')
}

const postRuangan = (data = null) => {
    const { nama, keterangan, img } = data
    return instance.post('/ruangan', data)
}

const patchRuangan = (data = null,_id) => {
    return instance.put('/ruangan/'+_id, data)
}

const deleteRuangan = (id = null) => {
    return instance.delete('/ruangan/'+id)
}

export default {
    getRuangan,
    postRuangan,
    patchRuangan,
    deleteRuangan
}