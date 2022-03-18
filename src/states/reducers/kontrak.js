import { ADD_KONTRAK, ADD_DETAIL_KONTRAK } from "..";

const kontrak = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_KONTRAK:
            return state.concat(payload)
        default:
            return state
    }

}

const detail_kontrak = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_DETAIL_KONTRAK:
            return state.concat(payload)
        default:
            return state
    }

}


export {
    kontrak,
    detail_kontrak
}