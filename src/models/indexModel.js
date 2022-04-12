import axios from "axios";
import { signData } from "../functions";
import { useAuth } from "../functions/hooks/auth";
import { IfUndefined } from '../functions/catcher'

const apiClient = axios.create({
    baseURL: 'https://wppl-inventaris.herokuapp.com/',
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
    "x-auth": IfUndefined(signData(), '', 'token')
}

export const instance = axios.create({
    ...config,
    headers:headers,
    baseURL: 'https://wppl-inventaris.herokuapp.com/'
})

