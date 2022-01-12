import React from 'react';

class Toast extends React.Component {
    render() { 
        return (
            this.props.message.length > 0 && <div class="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div className={"toast fade show border-0 align-items-center text-white " + (this.props.error ? 'bg-danger' : 'bg-success')}>
                    <div className="d-flex">
                        <div className="toast-body">
                            {this.props.message}
                        </div>
                        <button className="btn-close btn-close-white me-2 m-auto" onClick={this.props.toggle}></button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Toast;