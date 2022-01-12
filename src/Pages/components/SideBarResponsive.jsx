import React from 'react';
import { Link } from 'react-router-dom';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [
                { 
                    name: 'Dashboard',
                    icon: <i className="fas fa-home"></i>,
                    to: '/dashboard',
                },
                {
                    name: 'Data Utama',
                    icon: <i className="fas fa-server"></i>,
                    to: '/core'
                },
                {
                    name: 'Ruangan',
                    icon: <i className="fas fa-building"></i>,
                    to: '/ruang'
                },
                {
                    name: 'Transaksi',
                    icon: <i className="fas fa-exchange-alt"></i>,
                    to: '/transaction'
                }
            ],
            path: ''
        }
    }

    componentDidMount() {
        this.setState({ path: window.location.pathname })
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }

    whenClicked = () => {
        this.setState({ path: window.location.pathname })
    }

    render() { 
        return (
            <div className="px-2 sticky-top pt-4 d-custom">
                <ul className="nav flex-column sidebar mt-4 sticky-top">
                    {this.state.content.map((item, index) => {
                        return  (
                            <li className="nav-item my-2" key={index}>
                                <Link className={"nav-link rounded-3 py-3 nav-custom-link px-4 " + (item.to == window.location.pathname ? 'active' : null)} data-bs-toggle="tooltip" data-bs-placement="right" title={item.name} onClick={this.whenClicked} to={item.to}>{item.icon}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default SideBar;