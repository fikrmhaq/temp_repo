import { createContext, memo, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { isLogged } from "../../functions";
import Core from "../../Pages/Core/Core";
import { mapDispatchToProps } from "../../states/containers/barang";


const context = createContext(null)

export const useControllerState = () => {
    return useContext(context)
}

const useController = memo((props) => {

    const getBarang = (data) => {
        props.barang.get.getByDetailKontrak()
    }


    useEffect(() => {

        if(!isLogged()) {
            window.location.replace('https://asset.tikomdik-disdikjabar.id/auth')
            
        }


        // props.barang.get()
        props.kontrak.get.getWithDetail()
        

    }, [])


    return (
        <context.Provider
        
        value={
            {
                getBarang
            }
        }


        >
            <Core/>
        </context.Provider>
    )

})


export default connect(null, mapDispatchToProps)(useController)