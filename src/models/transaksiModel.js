import { instance } from "./indexModel"



const getTransaksi = (data = null) => {
    return instance.get('/transaksi')
}

const postTransaksi = (data = null) => {
    return instance.post('/transaksi', data)
}

const editTransaksi = (data = null, id) => {
    return instance.put('/transaksi/'+id, data)
}

const deleteTransaksi = (id = null) => {
    return instance.delete('/transaksi/'+id)
}


export default {
    getTransaksi,
    postTransaksi,
    editTransaksi,
    deleteTransaksi
}