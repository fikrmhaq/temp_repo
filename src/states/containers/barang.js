import { add, fetch, getByDetailKontrak, post, vendor } from "../actions/barang"
import kontrak from "../actions/kontrak"
import rincian from "../actions/rincian"



const mapDispatchToProps = (dispatch) => {

    return {
        rincian: {
            get: (data) => dispatch(rincian.fetch(data))
        },
        barang: {
            get: {
                getByDetailKontrak: (data) => dispatch(getByDetailKontrak(data))
            },
            post: (data) => dispatch(post(data))
        },
        vendor: {
            get: () => dispatch(vendor.fetch())
        },
        kontrak: {
            get: {
                getWithDetail: () => dispatch(kontrak.getWithDetail())
            },
            
        }
    }

}

export {
    mapDispatchToProps
}


