import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

 export interface Teacher{
    teacher: {
        id: number,
        avatar : string;
        bio: string;
        cost: number;
        name: string;
        subject:string;
        whatsapp: string;
    };
}

interface TeacherItemProps{
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) =>{
    return(
        <article className="teacher-item">
    <header>
        <img src={teacher.teacher.avatar} alt="Raphael"/>
        <div>
           <strong>{teacher.teacher.name}</strong>
           <span>{teacher.teacher.subject}</span>
        </div>
    </header>
    <p>{teacher.teacher.bio}</p>
    <footer>
        <p>Preço/hora
            <strong>{teacher.teacher.cost}</strong>
        </p>
        <a href={`https://wa.me/${teacher.teacher.whatsapp}`}>
            <img src={whatsappIcon} alt="Entrar em contato"/>
            Entrar em contato
        </a>
    </footer>
</article>

    )
    
}

export default TeacherItem;