import { ADD_BARANG, ADD_CORE_BARANG, ADD_RINCIAN, ADD_VENDOR, DELETE_CORE_BARANG, EDIT_CORE_BARANG } from ".."

const barang = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_BARANG:

            // Sample with Local
    

            localStorage.setItem(
            'barang',
             JSON.stringify(state.concat(payload)))
            

            //End Sample


            return state.concat(payload)

        default:
            return state       
    }

}

const vendor = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_VENDOR:
            return state.concat(payload)

        default:
            return state       
    }

}

const rincian = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_RINCIAN:



            return state.concat(payload)
        default:
            return state       
    }

}

const core = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_CORE_BARANG:

            // Sample with Local
    

            localStorage.setItem(
            'core',
             JSON.stringify(state.concat(payload)))
            

            //End Sample


            return state.concat(payload)
        case DELETE_CORE_BARANG:
            return state.filter(el => el._id !== payload._id)
        case EDIT_CORE_BARANG:
            return state.filter(el => el._id !== payload._id).concat(payload.items)
        default:
            return state       
    }

}

export {
    barang,
    vendor,
    rincian,
    core
}