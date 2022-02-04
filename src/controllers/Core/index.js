import { memo, useEffect } from "react";
import { connect } from "react-redux";
import { isLogged } from "../../functions";
import Core from "../../Pages/Core/Core";
import { mapDispatchToProps } from "../../states/containers/barang";



const useController = memo((props) => {


    useEffect(() => {

        if(!isLogged()) {
            window.location.replace('https://asset.tikomdik-disdikjabar.id/auth')
            
        }


        props.barang.get()

    }, [])


    return <Core/>

})


export default connect(null, mapDispatchToProps)(useController)