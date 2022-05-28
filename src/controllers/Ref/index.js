import { createContext, memo, useContext, useEffect, useState } from "react"
import Ref from "../../Pages/Ref/Ref"
import Toaster from "../../Pages/Core/Toast";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../states/containers/barang";

export const context = createContext(null)

export const useControllerState = () => {
    return useContext(context)
}

const useController = memo((props) => {
    const [message, setMessage] = useState(
        {
            message:'',
            error:false
        }
    )

    const Toast = (message, error = false) => {
        setMessage({ message, error })
    }

    const postKategori = (data) => {
        props.rincian.post(data)
    }


    const deleteKategori = (data) => {
            props.rincian.del(data)
    }

    const deleteVendor = (data) => {
        props.vendor.del(data)
    }

    const postVendor = (data) => {
        props.vendor.post(data) 
    }

    const patchVendor = (data) => {
        props.vendor.edit(data)
    }


    useEffect(() => {

        props.rincian.get()
        props.vendor.get() 


    }, [])


    return (
        <context.Provider

            value={
                {
                   postKategori,
                   postVendor,
                   patchVendor,
                   deleteKategori,
                   deleteVendor
                }
            }


        >
            <Ref

            {
                ...
                {
                 
                }
            }
            
            />
            <Toaster {
                ...
                message
            }></Toaster>
        </context.Provider>
    )

})


export default connect(null, mapDispatchToProps)(useController)