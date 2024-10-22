import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>JSRAMVERK</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create Document</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;