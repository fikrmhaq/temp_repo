import React, { cloneElement, useEffect } from "react";
import { connect } from "react-redux";
import { isLogged } from "../../functions";
import { useAuth } from "../../functions/hooks/auth";
import { useBarang } from "../../functions/hooks/states";
import Core from "../../Pages/Core/Core";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { mapDispatchToProps } from "../../states/containers/barang";

const useController = (props) => {
    
    

    useEffect(() => {

        if(!isLogged()) {
            window.location.replace('https://asset.tikomdik-disdikjabar.id/auth')
            
        }
        console.log('Dashboard')

        // props.barang.get()

        

    },[])
    

    return <Dashboard/>

}

export default connect(null, mapDispatchToProps)(useController)