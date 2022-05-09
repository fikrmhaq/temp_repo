import { createContext, memo, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { isLogged } from "../../functions";
import barangModel from "../../models/barangModel";
import Core from "../../Pages/Core/New/Core";
import { mapDispatchToProps } from "../../states/containers/barang";
import Service from "../../services/Services";
import Toaster from "../../Pages/Core/Toast";
import Services from "../../services/Services";
import axios from "axios";


export const context = createContext(null)

export const useControllerState = () => {
    return useContext(context)
}

const useController = memo((props) => {
    const [history, setHistory] = useState([])
    const [message, setMessage] = useState(
        {
            message:'',
            error:false
        }
    )

    const getBarang = (data) => {
        props.barang.get.getByDetailKontrak(data)
    }

    const getRincian = (data = 100000000000) => {
        barangModel.getRincian(data).then(res => {
            // this.state.history.push();
            setHistory({
                ...history,
                parent: 100000000000,
                data: res.data.data
            })
            // this.setState({ history: this.state.history });
        })
    }

    const postBarang = (barang) => {
        props.barang.post({ barang })
        Toast('Added',false)
        setTimeout(() => setMessage({ message: '', error: false }), 5000)
    }

    const editCoreBarang = (data) => {
        props.barang.edit.core(data)
    }

    const deleteCoreBarang = (data) => {
        props.barang.del.core(data)
    }

    const Toast = (message, error = false) => {
        // this.setState({ message: { message, error } }, () => {
        //     setTimeout(() => this.setState({ message: { message: '', error: false } }), 5000)
        // })

        setMessage({ message, error })
    }


    useEffect(() => {

        console.log('Core Effect')

        // if (!isLogged()) {
        //     window.location.replace('https://asset.tikomdik-disdikjabar.id/auth')

        // }

        // getRincian()

        // Services.getAssetRuangan().then(res1 => {
     
        // })

        // Services.getDetailBarang().then(res => {
            
        // })

        // axios.get('https://wppl-inventaris.herokuapp.com/rincian', 
        // { headers: { 'Authorization': JSON.parse(localStorage.getItem('log_data')).token } }
        // ).then(res=>{

        // })

        
        // barangModel.getRincian().then(res=>{

        // })


        props.rincian.get()
        props.vendor.get() 
        props.kontrak.get.get()
        props.kontrak.get_detail.get()
        
        props.barang.get.core()
        props.barang.get.unit()
        


    }, [])


    return (
        <context.Provider

            value={
                {
                    getBarang,
                    postBarang,
                    editCoreBarang,
                    deleteCoreBarang,
                    history
                }
            }


        >
            <Core

            {
                ...
                {
                    postBarang: (barang) => postBarang(barang),
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