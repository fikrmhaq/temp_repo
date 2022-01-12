import React from 'react';

class Login extends React.Component {
    componentDidMount() {
        if (localStorage.getItem('logged')) window.location.href = 'http://192.168.2.16:3000/dashboard';
    }

    login = async () => {
        await localStorage.setItem('logged', true);
        window.location.href = 'http://192.168.2.16:3000/dashboard';
    }
    
    render() { 
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
                                        <input type="text" name="username" id="username" class="form-control" placeholder="Username" />
                                    </div>
                                    <div class="form-group">
                                        <div class="position-relative">
                                            <input type="password" name="password" id="password" class="form-control" placeholder="Password" />
                                            <button class="btn px-3"><i class="far fa-eye"></i></button>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary col-12 mt-3 py-2 mb-2" onClick={this.login}>Login</button>
                                    <p class="text-center">Untuk Sekolah</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Login;