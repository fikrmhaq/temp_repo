import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

// class SideBar extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             content: [
//                 {
//                     name: 'Dashboard',
//                     icon: <i className="fas fa-home"></i>,
//                     to: '/dashboard',
//                 },
//                 {
//                     name: 'Data Utama',
//                     icon: <i className="fas fa-server"></i>,
//                     to: '/core'
//                 },
//                 {
//                     name: 'Ruangan',
//                     icon: <i className="fas fa-building"></i>,
//                     to: '/ruang'
//                 },
//                 {
//                     name: 'Transaksi',
//                     icon: <i className="fas fa-exchange-alt"></i>,
//                     to: '/transaction'
//                 },
//                 {
//                     name: 'Data Referensi',
//                     icon: <i class="fas fa-chart-pie"></i>,
//                     to: '/ref'
//                 }
//             ],
//             path: ''
//         }
//     }

//     componentDidMount() {
//         this.setState({ path: window.location.pathname })
//     }

//     whenClicked = (name) => {
//         this.setState({ path: window.location.pathname }, () => {
//             sessionStorage.setItem('pathname', name)
//         })
//     }

//     logout = () => {
//         localStorage.removeItem('logged');
//         window.location.href = 'http://192.168.2.16:3000/';
//     }

//     render() { 
//         return (
//             <div className="px-2 py-4 d-none d-cslg-block sidebar h-100 position-relative">
//                 <img src={require('./Img/LogoDark.png').default} alt="Logo" className="d-block mx-auto mb-2" width="20%" />
//                 <hr />
//                 <div className="d-flex flex-column" style={{ height: '90%' }}>
//                     <ul className="nav flex-column mt-4">
//                         {this.state.content.map((item, index) => {
//                             return  (
//                                 <li className="nav-item my-2" key={index}>
//                                     <Link className={"nav-link py-3 nav-custom-link px-4 " + (item.to == window.location.pathname ? 'active' : null)} onClick={() => {this.whenClicked(item.name)}} to={item.to}>{item.icon} {item.name}</Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                     <ul className='nav flex-column mt-auto'>
//                         <li className='nav-item my-2'>
//                             <Link className='nav-link py-3 nav-custom-link px-4'><i class="fas fa-cog"></i> Setelan</Link>
//                         </li>
//                         <li className='nav-item my-2'>
//                             <a href="#" className='nav-link py-3 nav-custom-link px-4' onClick={this.logout}><i class="fas fa-power-off"></i> Logout</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         );
//     }
// }

function SideBar() {
    const content = [
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
        },
        {
            name: 'Data Referensi',
            icon: <i class="fas fa-chart-pie"></i>,
            to: '/ref'
        }
    ]

    const [path, setPath] = useState('');

    useEffect(() => {
        setInterval(() => {
            setPath(window.location.pathname);
            sessionStorage.setItem('pathname', content.find(item => item.to == window.location.pathname).name);
        });
    })

    const logout = () => {
        localStorage.removeItem('logged');
        window.location.href = 'http://192.168.2.16:3000/'
    }

    return (
        <div className="px-2 py-4 d-none d-cslg-block sidebar h-100 position-relative">
            <img src={require('./Img/LogoDark.png').default} alt="Logo" className="d-block mx-auto mb-2" width="20%" />
            <hr />
            <div className="d-flex flex-column" style={{ height: '90%' }}>
                <ul className="nav flex-column mt-4">
                    {content.map((item, index) => {
                        return  (
                            <li className="nav-item my-2" key={index}>
                                <Link className={`nav-link py-3 nav-custom-link px-4 ${item.to == path && 'active'}`} to={item.to}>{item.icon} {item.name}</Link>
                            </li>
                        );
                    })}
                </ul>
                <ul className='nav flex-column mt-auto'>
                    <li className='nav-item my-2'>
                        <Link className='nav-link py-3 nav-custom-link px-4'><i class="fas fa-cog"></i> Setelan</Link>
                    </li>
                    <li className='nav-item my-2'>
                        <a href="#" className='nav-link py-3 nav-custom-link px-4' onClick={logout}><i class="fas fa-power-off"></i> Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;