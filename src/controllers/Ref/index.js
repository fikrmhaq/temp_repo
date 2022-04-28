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


    useEffect(() => {

        props.rincian.get()
        props.vendor.get() 


    }, [])


    return (
        <context.Provider

            value={
                {
                   
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