import { ADD_BARANG, ADD_CORE_BARANG, ADD_RINCIAN, ADD_VENDOR } from ".."

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

            // Sample with Local


            localStorage.setItem(
            'vendor', 
            JSON.stringify(state.concat(payload))
            )

            //End Sample



            return state.concat(payload)

        default:
            return state       
    }

}

const rincian = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_RINCIAN:


            localStorage.setItem(
            'rincian',
                JSON.stringify(state.concat(payload)))


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