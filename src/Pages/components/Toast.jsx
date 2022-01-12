import React from 'react';

class Toast extends React.Component {
    render() { 
        return (
            <div class="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div class={"toast fade border-0 align-items-center text-white " + (this.props.message != '' ? 'show ' : '') + (this.props.error ? 'bg-danger' : 'bg-success')} role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            {this.props.message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Toast;