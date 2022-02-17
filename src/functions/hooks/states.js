import { useSelector } from 'react-redux'
import mainReducers from '../../states'

const useBarang = () => {

    return useSelector(states => states.barang) 
}

const useVendor = () => {

    return useSelector(states => states.vendor) 
}

const useKontrak = () => {

    return useSelector(states => states.kontrak)
}

export {
    useBarang,
    useKontrak,
    useVendor
}