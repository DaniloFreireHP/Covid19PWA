import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"> Início</i>
            </Link>
            <Link to="/dados">
                <i className="fa fa-database"> Dados</i>
            </Link>
            <Link to="/graficos">
                <i className="fa fa-bar-chart"> Gráficos</i>
            </Link>
        </nav>
    </aside>