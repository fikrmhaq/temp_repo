import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://dev.tikom.elemen.my.id/asset/',
    // baseURL: 'http://192.168.100.37:3650/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const config = {
    timeout: 10000,
    validateStatus: function(status){
        // console.log(status, status < 400 && status != 204)
        return status < 400 && status != 204
    }
}


const headers =  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization":localStorage.getItem("token")
}

export const instance = axios.create({
    ...config,
    headers:headers,
    baseURL: 'https://asset.tikomdik-disdikjabar.id/'
})

