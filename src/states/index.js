import { combineReducers } from "redux"
import { barang, vendor, rincian } from "./reducers/barang"
import { kontrak, detail_kontrak } from "./reducers/kontrak"

const ADD_BARANG = 'ADD_BARANG' // Core Barang
const ADD_UNIT = 'ADD_UNIT' // Detail Barang
const ADD_KONTRAK = 'ADD_KONTRAK' // Kontrak
const ADD_RUANGAN = 'ADD_RUANGAN' // Ruangan

const ADD_VENDOR = 'ADD_VENDOR'

const ADD_RINCIAN = 'ADD_RINCIAN'
const ADD_DETAIL_KONTRAK = 'ADD_DETAIL_KONTRAK'




export {
    ADD_BARANG,
    ADD_UNIT,
    ADD_KONTRAK,
    ADD_RUANGAN,
    ADD_VENDOR,
    ADD_RINCIAN,
    ADD_DETAIL_KONTRAK
}



export default combineReducers({
    barang,
    kontrak,
    vendor,
    rincian,
    detail_kontrak
})