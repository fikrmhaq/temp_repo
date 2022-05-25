import { ADD_TRANSAKSI, DELETE_TRANSAKSI, EDIT_TRANSAKSI } from ".."

const transaksi = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_TRANSAKSI:
            return state.concat(payload)
        case EDIT_TRANSAKSI:
            return state.filter(el => el._id !== payload._id).concat(payload.items)
        case DELETE_TRANSAKSI:
            return state.filter(el => el._id !== payload)
        default:
            return state
    }


}

export {
    transaksi
}