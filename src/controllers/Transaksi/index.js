import { createContext, memo, useContext, useEffect, useState } from "react"
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../states/containers/barang";
import { Transaksi } from "../../Pages/Transaction"

export const context = createContext(null)

export const useControllerState = () => {
    return useContext(context)
}

const useController = memo((props) => {

    const postTransaksi = (data) => {
        props.transaksi.post(data)
    }

    const editTransaksi = (data) => {
        props.transaksi.edit(data)
    }


    useEffect(() => {


        props.transaksi.get()
        props.barang.get.unit()
        props.barang.get.core()


    }, [])


    return (
        <context.Provider

            value={
                {
                    postTransaksi,
                    editTransaksi
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