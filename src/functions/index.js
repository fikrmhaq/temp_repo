import { data } from "../constants/auth";

function signData (){
    
    if(data == null) return undefined
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

const date_format = (data) => {
    const month_label = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

    var base = new Date(data)
    var month = base.getMonth()
    var date = base.getDate()
    var year = base.getFullYear()

    return date + ' ' + month_label[month] + ' ' + year
}

export {
    isLogged,
    signData,
    date_format,
    catchUndefined
}