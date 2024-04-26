import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Container, Content, Icon} from './styles';

import { Highlight } from '@components/Highlight';
import  { Button } from '@components/Button';

import { Header } from '@components/Header'
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';


export function NewGroup(){
    const [group, setGroup] = useState('');
    const navigation = useNavigation();
    
    async function handleNew(){
        await groupCreate(group);
        navigation.navigate('players', {group});
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