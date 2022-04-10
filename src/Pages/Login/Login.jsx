import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { isLogged } from '../../functions';


const Login = () => {
    // const query = useQuery()
    let { search } = useLocation();

    const [log, setLog] = useState(
        {
            username: '',
            password: ''
        }
    )

    useEffect(() => {
        
        if(isLogged()){
            window.location.replace('/dashboard')
        }

        

        const query = new URLSearchParams(search);
        const code = query.get('code');

        axios.get('https://asset.tikomdik-disdikjabar.id/auth/callback?code='+code).then(res=>{
            // console.log(res)
            localStorage.setItem('signData',JSON.stringify({token:res.data}))
            localStorage.setItem('token', res.data.auth_token)
            window.location.replace('/dashboard')
        })

        
    }, [])

    const login = async () => {
        axios.post('https://wppl-inventaris.herokuapp.com/auth/login', log).then(res=>{
            localStorage.setItem('log_data', JSON.stringify({ ...res.data.responseData.userData, token: res.data.responseData.token }))
            
            window.location.replace('/core')
        })
    }

    return (
        <div class="login py-5">
            <div class="background"></div>
            <div class="background"></div>
            <div class="background"></div>
            <div class="background"></div>
            <div class="card mx-5">
                <div class="card-body">
                    <div class="row p-0 m-0">
                        <div class="col-lg-7">
                            <img src={require('./vector.png').default} class="img1" alt="Vector" />
                        </div>
                        <div class="col-lg-5 d-flex flex-column">
                            <div class="box px-4 py-3 my-auto mx-auto">
                                <img src={require('../components/Img/LogoDark.png').default} class="d-block mx-auto mb-3" alt="Logo" />
                                <h3 class="text-center">Selamat Datang</h3>
                                <h6 class="text-center">Silahkan Login</h6>
                                <div class="form-group mb-3">
                                    <input 
                                    onChange={ev=>setLog({...log, username: ev.target.value})}
                                    type="text" name="username" id="username" class="form-control" placeholder="Username" />
                                </div>
                                <div class="form-group">
                                    <div class="position-relative">
                                        <input
                                        onChange={ev=>setLog({...log, password: ev.target.value})}
                                        type="password" name="password" id="password" class="form-control" placeholder="Password" />
                                        <button class="btn px-3"><i class="far fa-eye"></i></button>
                                    </div>
                                </div>
                                <button class="btn btn-primary col-12 mt-3 py-2 mb-2" onClick={login}>Login</button>
                                <p class="text-center">Untuk Sekolah</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;