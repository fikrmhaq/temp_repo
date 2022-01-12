import React from 'react';
import { Card } from '../../components';

class RefContainer extends React.Component {
    render() { 
        return (
            <div className="col-lg-4 ref-container">
                <Card>
                    <div className="d-flex justify-content-between px-2">
                        <div>
                            <h5 className='text-capitalize'>{this.props.title}</h5>
                            <h6>{this.props.data} Data</h6>
                        </div>
                        <div className='my-auto'>
                            <button className="btn btn-primary px-4" onClick={this.props.clicked}>Lihat</button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
 
export default RefContainer;