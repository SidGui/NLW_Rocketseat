import React from 'react';

import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css'
interface PageHeaderProps {
    title: string;
    description?: string;
}


const  PageHeader: React.FC<PageHeaderProps> = ({title, description, children}) => {
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
            {description && <p>{description}</p>}
    
            {children}

        </div>
    </header>
)
}

export default PageHeader;