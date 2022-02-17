import { instance } from "./indexModel";

const getKontrak = (data = null) => {
    return instance.get('/core_kontrak', {
        params:data
    }).catch(err=>{
        // if(err.response.status == 401){
        //     localStorage.clear()
        //     window.location.reload()
        // }
    })
}

const getDetailKontrak = (data = null) => {
    return instance.get('/detail_kontrak', {
        params:data
    }).catch(err=>{
        console.log(err.response)
    })
}

const postDetailKontrak = (data = null) => {
    return instance.post('/detail_kontrak', data)
}

export default {
    getKontrak,
    getDetailKontrak,
    postDetailKontrak
}
