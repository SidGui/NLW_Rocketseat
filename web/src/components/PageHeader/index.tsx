import React from 'react';

import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css'
interface PageHeaderProps {
    title: string
}


const  PageHeader: React.FC<PageHeaderProps> = ({title, children}) => {
    return(
    <header id="" className="page-header">
        <div id="" className="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="voltar" />
            </Link>
            <img src={logoImg} alt="logo" />
        </div>
        <div id="" className="header-content">
            <strong>
                {title}
            </strong>
            {children}

        </div>
    </header>
)
}

export default PageHeader;