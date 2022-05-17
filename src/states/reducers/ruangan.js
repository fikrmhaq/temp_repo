import { ADD_RUANGAN } from ".."



const ruangan = (state = [], action) => {
    const {type, payload} = action


    switch(type){
        case ADD_RUANGAN:

           return state.concat(payload)

        default:
            return state
    }

}


export {
    ruangan
}