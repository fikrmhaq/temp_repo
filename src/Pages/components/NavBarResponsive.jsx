import React from 'react';
import { Link } from 'react-router-dom';

class NavBarResponsive extends React.Component {
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
            path: '',
            activeTitle: 'Dashboard'
        }
    }

    componentDidMount() {
        this.setState({ path: window.location.pathname });
    }

    whenClicked = () => {
        this.setState({ path: window.location.pathname })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-white shadow sticky-top d-block d-lg-none">
                <div className="container-fluid">
                    <button class="navbar-toggler py-2 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <i className="fas fa-bars"></i>
                    </button>
                    <a href="#" className="navbar-brand fw-bold">Asset</a>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">{this.state.activeTitle}</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul className="nav flex-column sidebar mt-4">
                                {this.state.content.map((item, index) => {
                                    return  (
                                        <li className="nav-item my-2" key={index}>
                                            <Link className={"nav-link rounded-3 py-3 nav-custom-link px-4 " + (item.to == window.location.pathname ? 'active' : null)} title={item.name} onClick={() => {this.whenClicked(); this.setState({ activeTitle: item.name })}} to={item.to}>{item.icon} {item.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBarResponsive;