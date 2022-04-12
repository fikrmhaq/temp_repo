import React, { useEffect } from 'react'
import { isLogged } from '..'
import Login from '../../Pages/Login/Login'


const useAuth = (component) => {

 
    

  

    var log = localStorage.getItem('log_data')

    if(log == null) {
        return ''
    } else {
        return JSON.parse(localStorage.getItem('log_data')).token
    }

}

export {
    useAuth
}