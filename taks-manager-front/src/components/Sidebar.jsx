import React from 'react'
import { Link } from 'react-router-dom'

const menus = [
    {
        name : 'Atividades',
        subMenus : [ 
            { name : 'Linha do Tempo', link: '/' },
            { name : 'Criar', link : '/atividades/novo' } , 
        ]          
    }


]

const Sidebar = () => {

    const renderMenus = () => {
        return menus.map(m => {
            return (
                <li key={m.name} className="nav-item ">
                    <a className="nav-link" href="../" data-toggle="collapse" aria-expanded="false" data-target="#submenu-4" aria-controls="submenu-4"><i className="fab fa-fw fa-wpforms"></i>{ m.name }</a>
                    <div id="submenu-4" className="collapse submenu" >
                        <ul className="nav flex-column">
                            { m.subMenus.map(m => {
                                return (
                                    <li key={m.name} className="nav-item">
                                        <Link className="nav-link" to={m.link}>{ m.name }</Link>
                                    </li>
                                )
                            }) }                            
                        </ul>
                    </div>
                </li>
            )
        })
    }

    return (
        <div className="nav-left-sidebar sidebar-dark">
            <div className="menu-list">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="d-xl-none d-lg-none" href="../">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-divider">
                                Menu
                            </li> 
                            {renderMenus()}  
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar