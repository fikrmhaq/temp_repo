import { data } from "../constants/auth";

function signData (){
    
    if(data == null) return
    return JSON.parse(data) 
}

function isLogged () {

    if(data == null) return false
    return true

}

export {
    isLogged,
    signData
}