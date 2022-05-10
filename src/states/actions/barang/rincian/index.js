import { ADD_RINCIAN } from '../../..'
import barangModel from '../../../../models/barangModel'
import rincian_data from '../../../sample/rincian.json'

const fetch = () => {
    
    return (dispatch, getState) => {
        
        const { rincian } = getState()

        if(rincian.length == 0){
            barangModel.getRincian().then(res=>{
                console.log(res)
                
            })
        }

        
    }
}

const add = (data = []) => {
    return {
        type:ADD_RINCIAN,
        payload:data
    }
}

export default {
    fetch,
    add
}