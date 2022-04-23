import { add, fetch, getByDetailKontrak, post, vendor } from "../actions/barang"
import core_barang from '../actions/barang/core'
import kontrak from "../actions/kontrak"
import rincian from "../actions/rincian"



const mapDispatchToProps = (dispatch) => {

    return {
        rincian: {
            get: () => dispatch(rincian.fetch())
        },
        barang: {
            get: {
                core: () => dispatch(core_barang.fetch()),
                unit: () => dispatch(fetch())
            },
            del: {
                core: (data) => dispatch(core_barang.del(data))
            },
            
            core: () => dispatch(core_barang.fetch()),
            post: (data) => dispatch(core_barang.post(data))
        },
        vendor: {
            get: () => dispatch(vendor.fetch())
        },
        kontrak: {
            get: {
                get: () => dispatch(kontrak.fetch())
            },
            get_detail: {
                get: () => dispatch(kontrak.fetch_detail())
            },
            
        }
    }

}

export {
    mapDispatchToProps
}


