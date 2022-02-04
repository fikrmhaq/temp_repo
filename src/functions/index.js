import { data } from "../constants/auth";

function signData (){
    
    if(data == null) return
    return JSON.parse(data) 
}

function isLogged () {

    if(data == null) return false
    return true

}

const catchUndefined = (data) => {
    if(data == undefined) return []
    return data
}

export {
    isLogged,
    signData,
    catchUndefined
}