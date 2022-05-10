import React from 'react';

// Component
import { Card } from '../../components';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: 'Dashboard'
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.pathname != sessionStorage.getItem('pathname')) this.setState({ pathname: sessionStorage.getItem('pathname') })
        })
    }

    render() { 
        return (
            <nav className="navbar navbar-cs navbar-expand-lg bg-transparent py-1 mt-3 d-none d-lg-block">
                <div className="container-fluid d-block">
                    <div className="row">
                        <div className="col-lg-9 my-auto">
                            <a href="#" className="navbar-brand">{this.state.pathname}</a>
                        </div>
                        <div className="col-lg-3">
                            <Card>
                                <div className="d-flex">
                                    <div>
                                        <div className='photo-profile position-relative my-auto me-3'>
                                            <h5 className='m-0'>AL</h5>
                                        </div>
                                    </div>
                                    <div className='profile my-auto'>
                                        <p className="m-0">Inventory</p>
                                        <p className="m-0">aezakmi@gmail.com</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default NavBar;