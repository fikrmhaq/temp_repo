import { useSelector } from 'react-redux'
import mainReducers from '../../states'

const useBarang = () => {

    return useSelector(states => states.barang) 
}

const useCoreBarang = () => {
    
    return useSelector(states => states.core)
}

const useRincian = () => {
    
    return useSelector(states => states.rincian)
}

const useVendor = () => {

    return useSelector(states => states.vendor) 
}

const useKontrak = () => {

    return useSelector(states => states.kontrak)
}

const useRuangan = () => {
    return useSelector(states => states.ruangan)
}

const useAll = () => {
    return useSelector(states => states)
}

const useDetailKontrak = () => {
    
    return useSelector(states => states.detail_kontrak)
}

const useTransaksi = () => {
    return useSelector(states => states.transaksi)
}

export {
    useBarang,
    useKontrak,
    useVendor,
    useDetailKontrak,
    useCoreBarang,
    useRincian,
    useRuangan,
    useAll,
    useTransaksi
}