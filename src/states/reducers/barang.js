import { ADD_BARANG } from ".."

const barang = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_BARANG:
            return state.concat(payload)
        default:
            return state       
    }

}

export {
    barang
}