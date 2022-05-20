import { ADD_TRANSAKSI } from ".."

const transaksi = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_TRANSAKSI:
            return state.concat(payload)
        default:
            return state
    }


}

export {
    transaksi
}