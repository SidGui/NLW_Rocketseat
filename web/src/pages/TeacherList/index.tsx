import React from 'react';

import PageHeader from '../../components/PageHeader';


import './styles.css'
import TeacherItem from '../../components/TeacherItem';
function TeacherList() {
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form action="" id="search-teachers">
                    <div id="" className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>
                    <div id="" className="input-block">
                        <label htmlFor="week_day">Dia da semana</label>
                        <input type="text" id="week_day" />
                    </div>
                    <div id="" className="input-block">
                        <label htmlFor="time">hora</label>
                        <input type="text" id="time" />
                    </div>
                </form>
            </PageHeader>
            <main>
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList;