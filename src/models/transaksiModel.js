import { instance } from "./indexModel"



const getTransaksi = (data = null) => {
    return instance.get('/transaksi')
}


export default {
    getTransaksi
}