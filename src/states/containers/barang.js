import { add, fetch, getByDetailKontrak, post, vendor } from "../actions/barang"
import core_barang from '../actions/barang/core'
import kontrak from "../actions/kontrak"
import rincian from "../actions/rincian"
import ruangan from '../actions/ruangan'
import transaksi from "../actions/transaksi"



const mapDispatchToProps = (dispatch) => {

    return {
        rincian: {
            get: () => dispatch(rincian.fetch()),
            post: (data) => dispatch(rincian.post(data)),
            del: (data) => dispatch(rincian.del(data))
        },
        barang: {
            get: {
                core: () => dispatch(core_barang.fetch()),
                unit: () => dispatch(fetch())
            },
            del: {
                core: (data) => dispatch(core_barang.del(data))
            },
            edit: {
                core: (data) => dispatch(core_barang.edit(data))
            },
            
            core: () => dispatch(core_barang.fetch()),
            post: (data) => dispatch(core_barang.post(data))
        },
        vendor: {
            get: () => dispatch(vendor.fetch()),
            post: (data) => dispatch(vendor.post(data)),
            del: (data) => dispatch(vendor.del(data))
        },
        kontrak: {
            get: {
                get: () => dispatch(kontrak.fetch())
            },
            get_detail: {
                get: () => dispatch(kontrak.fetch_detail())
            },
            
        },
        ruangan: {
            get: () => dispatch(ruangan.fetch()),
            post: (data) => dispatch(ruangan.post(data)),
            edit: (data) => dispatch(ruangan.patch(data)),
            delete: (data) => dispatch(ruangan.del(data))
        },
        transaksi: {
            get: () => dispatch(transaksi.fetch()),
            post: (data) => dispatch(transaksi.post(data)),
            edit: (data) => dispatch(transaksi.patch(data)),
            delete: (data) => dispatch(transaksi.del(data))
        }
    }

}

export {
    mapDispatchToProps
}


 