import React, { useState, FormEvent } from 'react';
import './style.css';
import PageHeader from '../../components/pageHeader';
import TeacherItem, {Teacher} from '../../components/teacherItem';
import Input from '../../components/input';
import Select from '../../components/select';
import api from '../../services/api';



function TeacherList(){
   
   const [teachers, setTeachers] = useState([]);
   const [subject, setSubject] = useState('');
   const [week_day, setWeekDay] = useState('');
   const [time, setTime] = useState('');

   async function searchTeachers(e:FormEvent){
      e.preventDefault();

      const response = await api.get('/classes',  {
         params : {
            subject,
            week_day,
            time,
         }
      });
      setTeachers(response.data);
   }

    return(
       <div id="page-teacher-list" className="container">
          <PageHeader title="Estes são os Proffys disponíveis!">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select
                options = {[
                    {value: 'Artes', label:'Artes'},
                    {value: 'Biologia', label:'Biologia'},
                    {value: 'Ciências', label:'Ciências'},
                    {value: 'Educação Física', label:'Educação Física'},
                    {value: 'Filosofia', label:'Filosofia'},
                    {value: 'Português', label:'Português'},
                    {value: 'História', label:'História'},
                    {value: 'Química', label:'Química'},
                ]}
                name="subject" 
                label="Matéria"
                value={subject}
                onChange={e =>{
                   setSubject(e.target.value)
                }}
                />
                   <Select
                     options = {[
                     {value: '6', label:'Domingo'},
                     {value: '0', label:'Segunda-feira'},
                     {value: '1', label:'Terça-feira'},
                     {value: '2', label:'Quarta-feira'},
                     {value: '3', label:'Quinta-feira'},
                     {value: '4', label:'Sexta-feira'},
                     {value: '5', label:'Sábado'},
                ]}
                name="week-day" 
                label="Dia da semana"
                value={week_day}
                onChange={e =>{
                   setWeekDay(e.target.value)
                }}
                />
                  <Input name="time" type="time" label="Hora"
                   value={time}
                   onChange={e =>{
                      setTime(e.target.value)}}
                  />
                  <button type="submit">Buscar</button>
                </form>
          </PageHeader>
          <main>
             {teachers.map((teacher : Teacher) =>{
                return <TeacherItem key={teacher.teacher.id} teacher={teacher}/>
             })}
             
          </main>
       </div>
    )
}
export default TeacherList;