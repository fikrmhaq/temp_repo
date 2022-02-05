import { ADD_KONTRAK } from "..";

const kontrak = (state = [], action) => {
    const { type, payload } = action

    switch(type){
        case ADD_KONTRAK:
            return state.concat(payload)
        default:
            return state
    }

}

export {
    kontrak
}