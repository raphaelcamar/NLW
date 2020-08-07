import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/pageHeader';
import './styles.css'
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/textArea';
import Select from '../../components/select';
import api from '../../services/api';
import { useHistory }from 'react-router-dom'

function TeacherForm(){
    const history = useHistory();

    const [name, setName]                   = useState('');
    const [avatar, setAvatar]               = useState('');
    const [whatsapp, setWhatsapp]           = useState('');
    const [bio, setBio]                     = useState('');
    const [subject, setSubject]             = useState('');
    const [cost, setCost]                   = useState('');
    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to : '' }
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0,from: '', to : '' }
        ]);
    }

    function setScheduleItemValue(position: number, field:string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) =>{
                if(index === position){
                    return{ ...scheduleItem, [field]:value }
                }
                return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost : Number(cost),
            schedule : scheduleItems
        }).then(() =>{
            alert('Cadastro realizado com sucesso!')
            history.push('/');
        }).catch(() =>{
            alert('Cadastro não realizado.')
        })

        console.log({
            name, 
            avatar, 
            whatsapp, 
            bio, 
            subject, 
            cost, 
            scheduleItems
        });
    }
    return(
        <div id="page-teacher-form" className="container">
        <PageHeader title="que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
        />

        <main>
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seus dados</legend>
            <Input 
                name="name" 
                label="Nome completo" 
                value={name} onChange={(e) =>{ setName(e.target.value) }}
            />
            <Input 
                name="avatar" 
                label="avatar"
                value={avatar} onChange={(e) =>{ setAvatar(e.target.value) }}
                />
            <Input 
                name="whatsapp" 
                label="Whatsapp"
                value={whatsapp} onChange={(e) =>{ setWhatsapp(e.target.value) }}
            />
            <Textarea 
                name="bio" 
                label="biografia"
                value={bio} onChange={(e) =>{ setBio(e.target.value) }}
                />
            </fieldset>
            <fieldset>
                <legend>Sobre a aula</legend>

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
                onChange={(e) =>{setSubject(e.target.value)}}
                />
            <Input 
                name="cost" 
                label="Custo da sua hora por aula"
                value={cost}
                onChange={(e) =>{setCost(e.target.value)}}
            />
            </fieldset>
        <fieldset>
            <legend>Horários disponíveis 
                <button type="button" onClick={addNewScheduleItem}>
                     + Novo horário</button>
            </legend>
            {scheduleItems.map((scheduleItem, index) =>{
                return(
                    <div key={ scheduleItem.week_day } className="schedule-item">
                <Select
                name="week_day"
                label="Dia da semana"
                value={scheduleItem.week_day}
                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                options = {[
                    {value: '6', label:'Domingo'},
                    {value: '0', label:'Segunda-feira'},
                    {value: '1', label:'Terça-feira'},
                    {value: '2', label:'Quarta-feira'},
                    {value: '3', label:'Quinta-feira'},
                    {value: '4', label:'Sexta-feira'},
                    {value: '5', label:'Sábado'},
               ]}/>
               <Input 
                    type="time" 
                    name="from" 
                    label="das"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
               <Input 
                    type="time" 
                    name="to" 
                    label="até"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />

            </div>
                )
            })}
        </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante"/>
                    Importante! <br/>
                    Preencha todos os dados
                </p>
                <button type="submit">
                    Salvar cadastro
                </button>
            </footer>
            </form>
        </main>
     </div>
    )
}
export default TeacherForm;