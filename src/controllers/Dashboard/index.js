import React, { cloneElement, useEffect } from "react";
import { isLogged } from "../../functions";
import { useAuth } from "../../functions/hooks/auth";
import Core from "../../Pages/Core/Core";

const useController = () => {

    

    useEffect(() => {

        if(!isLogged()) {
            window.location.replace('https://asset.tikomdik-disdikjabar.id/auth')
            
        }
        console.log('Dashboard')
    },[])
    

    return <Core/>

}

export default useController