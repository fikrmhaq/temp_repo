import { useSelector } from 'react-redux'
import mainReducers from '../../states'

const useBarang = () => {

    return useSelector(states => states.barang) 
}

const useCoreBarang = () => {
    
    return useSelector(states => states.core)
}

const useVendor = () => {

    return useSelector(states => states.vendor) 
}

const useKontrak = () => {

    return useSelector(states => states.kontrak)
}

const useDetailKontrak = () => {
    
    return useSelector(states => states.detail_kontrak)
}

export {
    useBarang,
    useKontrak,
    useVendor,
    useDetailKontrak,
    useCoreBarang
}