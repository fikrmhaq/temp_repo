import { createContext, memo, useContext, useEffect, useState } from "react"
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../states/containers/barang";
import { Transaksi } from "../../Pages/Transaction"

export const context = createContext(null)

export const useControllerState = () => {
    return useContext(context)
}

const useController = memo((props) => {


    useEffect(() => {


        props.transaksi.get()


    }, [])


    return (
        <context.Provider

            value={
                {

                }
            }


        >
            <Transaksi

            {
                ...
                {
                 
                }
            }
            
            />
        </context.Provider>
    )

})


export default connect(null, mapDispatchToProps)(useController)