import React, { useState} from 'react';
import styles from './styles';
import { View, Text, TextInput } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){

    const [isfiltersVisible, setIsFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){

                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher : Teacher) =>{
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(() =>{
        loadFavorites();
    });

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isfiltersVisible);
    }

    async function handleFiltersSubmit(){
        loadFavorites();

       const response = await api.get('classes', {
           params : {
               subject,
               week_day,
               time,
           }
       });
       setIsFiltersVisible(false);
       setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title='Proffys disponíveis' 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color='#fff'/>
                    </BorderlessButton>
                )}
            >
                {isfiltersVisible && (
                    <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                      <TextInput    
                          style={styles.input} 
                          placeholder='Qual a matéria?'
                          placeholderTextColor='#c1bccc'
                          value={subject}
                          onChangeText={text => setSubject(text)}
                      />
                  <View style={styles.inputGroup}>
                      <View style={styles.inputBlock}>
                          <Text style={styles.label}>Dia da semana</Text>
                          <TextInput
                              style={styles.input}
                              placeholder='Qual o dia? '
                              placeholderTextColor='#c1bccc'
                              value={week_day}
                              onChangeText={text => setWeekDay(text)}
                          />
  
                      </View>
  
                      <View style={styles.inputBlock}>
                          <Text style={styles.label}>Horário</Text>
                          <TextInput
                              style={styles.input}
                              placeholder='Qual o horário?'
                              placeholderTextColor='#c1bccc'
                              value={time}
                              onChangeText={text => setTime(text)}
                          />
                          
                      </View>
                  </View>

                  <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                  </RectButton>
                  </View>
                )}
                
            </PageHeader>

        <ScrollView 
            style={styles.teacherList}
            contentContainerStyle= {{
                paddingHorizontal : 16,
                paddingBottom : 24
            }}
        >
           {teachers.map((teacher : Teacher ) => {
               return(
                <TeacherItem 
                key={teacher.id} 
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
            />
               )
               
           })}
        </ScrollView>
        </View>
    );
}
export default TeacherList;