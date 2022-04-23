import React, { cloneElement, useEffect } from "react";
import { connect } from "react-redux";
import { isLogged } from "../../functions";
import { useAuth } from "../../functions/hooks/auth";
import { useBarang, useCoreBarang } from "../../functions/hooks/states";
import Core from "../../Pages/Core/Core";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { mapDispatchToProps } from "../../states/containers/barang";

const useController = (props) => {

    const barang = useBarang()
    
    

    useEffect(() => {
        console.log('Dashboard Effect')
        // if(!isLogged()) {
        //     window.location.replace('https://asset.tikomdik-disdikjabar.id/auth')
            
        // }
        // console.log('Dashboard')

        // props.barang.get()


            props.barang.get.core()
            props.barang.get.unit()

        

    },[])
    

    return <Dashboard/>

}

export default connect(null, mapDispatchToProps)(useController)