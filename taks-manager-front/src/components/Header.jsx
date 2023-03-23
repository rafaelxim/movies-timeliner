import React from 'react'
import avatar1 from '../assets/avatar-1.jpg'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <div className="dashboard-main-wrapper">
                <div className="dashboard-header">
                    <nav className="navbar navbar-expand-lg bg-white fixed-top">
                        <a className="navbar-brand" href="../index.html">.NOWW</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto navbar-right-top">
                                <li className="nav-item dropdown nav-user">
                                    <a className="nav-link nav-user-img" href="../index.html" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={avatar1} alt="" className="user-avatar-md rounded-circle" /></a>
                                    <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                        <div className="nav-user-info">
                                            <h5 className="mb-0 text-white nav-user-name">Usuário</h5>
                                            <span className="status"></span><span className="ml-2">Logado</span>
                                        </div>
                                        <a className="dropdown-item" href="../index.html"><i className="fas fa-user mr-2"></i>Conta</a>
                                        <a className="dropdown-item" href="../index.html"><i className="fas fa-cog mr-2"></i>Configurações</a>
                                        <Link onClick={() => localStorage.removeItem('x-auth-token')} className="dropdown-item" to="/login"><i className="fas fa-power-off mr-2"></i>Logout</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header 