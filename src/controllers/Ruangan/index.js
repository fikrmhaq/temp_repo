import { createContext, memo, useContext, useEffect, useState } from "react"
import Ref from "../../Pages/Ref/Ref"
import Toaster from "../../Pages/Core/Toast";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../states/containers/barang";
import { Ruangan } from "../../Pages/Ruangan";

export const context = createContext(null)

export const useControllerState = () => {
    return useContext(context)
}

const useController = memo((props) => {

    const postRuangan = (data) => {
        props.ruangan.post(data)
    }

    const editRuangan = (data) => {
        props.ruangan.edit(data)
    }

    const deleteRuangan = (data) => {
        props.ruangan.delete(data)
    }


    useEffect(() => {

        props.ruangan.get()
        props.vendor.get()


    }, [])


    return (
        <context.Provider

            value={
                {
                  postRuangan,
                  editRuangan,
                  deleteRuangan
                }
            }


        >
            <Ruangan

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