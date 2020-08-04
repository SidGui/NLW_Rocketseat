import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
function TeacherItem () {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/13417343?s=460&v=4" alt="Sidao92"/>
                <div>
                    <strong>Sidao 92</strong>
                    <span>Química</span>
                </div>
            </header>
            <p>
                Entusiasta das melhores tecnologias de quimica avançada
                <br/> <br/>
                To com preguiça de escrever o restante.
                Depois pego o restante do texto 
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>
                        R$ 222,00
                    </strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;