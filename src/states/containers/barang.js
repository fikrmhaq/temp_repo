import { add, fetch, getByDetailKontrak } from "../actions/barang"
import kontrak from "../actions/kontrak"


const mapDispatchToProps = (dispatch) => {

    return {
        barang: {
            get: {
                getByDetailKontrak: (data) => dispatch(getByDetailKontrak(data))
            },
        },
        kontrak: {
            get: {
                getWithDetail: () => dispatch(kontrak.getWithDetail())
            }
        }
    }

}

export {
    mapDispatchToProps
}


