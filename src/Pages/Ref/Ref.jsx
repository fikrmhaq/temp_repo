import React from 'react';
import Services from '../../services/Services';
import RefContainer from './RefContainer';
import Vendor from './Vendor/Vendor';

class Ref extends React.Component {
    state = {
        total: {
            vendor: null,
            supplier: null
        },
        active: 0
    }

    componentDidMount() {
        Services.getVendor().then(res => {
            this.state.total.vendor = res.data.data.length;
            this.setState({ total: this.state.total });
        })
        Services.getSupplier().then(res => {
            this.state.total.supplier = res.data.data.length;
            this.setState({ total: this.state.total });
        })
    }

    render() { 
        return (
            <div className='ref'>
                {!this.state.active && (
                    <div className='row'>
                        {Object.keys(this.state.total).map((item, index) => (
                            <RefContainer title={item} data={this.state.total[item]} clicked={() => this.setState({ active: index + 1 })} />
                        ))}
                    </div>
                )}
                {this.state.active == 1 && (
                    <Vendor back={() => this.setState({ active: 0 })} />
                )}
            </div>
        );
    }
}
 
export default Ref;