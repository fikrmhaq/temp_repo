import { instance } from './indexModel'





const getRuangan = (data = null) => {
    return instance.get('/ruangan')
}

const postRuangan = (data = null) => {
    const { nama, keterangan, img } = data
    return instance.post('/ruangan', data)
}

export default {
    getRuangan,
    postRuangan
}