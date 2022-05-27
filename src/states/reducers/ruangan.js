import { ADD_RUANGAN, DELETE_RUANGAN, EDIT_RUANGAN } from ".."



const ruangan = (state = [], action) => {
    const {type, payload} = action


    switch(type){
        case ADD_RUANGAN:

           return state.concat(payload)
        case EDIT_RUANGAN:
            return state.filter(a=> a._id != payload._id).concat(payload.items)
        case DELETE_RUANGAN:
            return state.filter(a=> a._id != payload)
        default:
            return state
    }

}


export {
    ruangan
}