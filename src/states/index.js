import { combineReducers } from "redux"
import { barang } from "./reducers/barang"
import { kontrak } from "./reducers/kontrak"

const ADD_BARANG = 'ADD_BARANG' // Core Barang
const ADD_UNIT = 'ADD_UNIT' // Detail Barang
const ADD_KONTRAK = 'ADD_KONTRAK' // Kontrak
const ADD_RUANGAN = 'ADD_RUANGAN' // Ruangan




export {
    ADD_BARANG,
    ADD_UNIT,
    ADD_KONTRAK,
    ADD_RUANGAN
}



export default combineReducers({
    barang,
    kontrak
})