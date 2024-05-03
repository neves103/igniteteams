import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Container, Content, Icon} from './styles';

import { Highlight } from '@components/Highlight';
import  { Button } from '@components/Button';

import { Header } from '@components/Header'
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';


export function NewGroup(){
    const [group, setGroup] = useState('');
    const navigation = useNavigation();
    
    async function handleNew(){
        try{
            if(group.trim().length === 0){
                return Alert.alert('Novo Grupo','Informe o nome da Turma');
            }

            await groupCreate(group);
            navigation.navigate('players', {group});
            }catch (error) {
                
                if(error instanceof AppError){
                    Alert.alert('Novo Grupo', error.message);
                }else{
                    Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo');
                }

            }
    }

    return(
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon />
                <Highlight 
                    title="Nova turma"
                    subtitle="Crie turma para add as pessoas" 
                />


                <Input 
                    placeholder='Nome da Turma'
                    onChangeText={setGroup}
                    onSubmitEditing={handleNew}
                />
                <Button 
                    title='Criar' 
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />

            </Content>
            
        </Container>
    );
}