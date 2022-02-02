import { add, fetch, getsomenewest } from "../actions/barang"


const mapDispatchToProps = (dispatch) => {

    return {
        barang: {
            get: (data) => dispatch(fetch(data)),
        }
    }

}

export {
    mapDispatchToProps
}


