import { useSelector } from 'react-redux'
import mainReducers from '../../states'

const useBarang = () => {

    return useSelector(states => states.barang) 
}

export {
    useBarang
}