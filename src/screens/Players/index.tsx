import { useRoute } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';
import { useState } from 'react';
import { AppError } from '@utils/AppError';

import { PlayerCard } from '@components/PlayerCard';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';

import { Container, Form, HeaderList, NumbersOfPlayers} from './styles';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetBygroup';


type RouterParams = {
    group: string;
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('');
    const [players, setPlayers] = useState([]);

    const route = useRoute();
    const { group } = route.params as RouterParams;

    async function handleAddPlayers(){
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.');
        }

        const newPlayer = {
            name: newPlayerName,
            team:team
        }

        try{
            await playerAddByGroup(newPlayer, group);
            const  players = await playersGetByGroup(group);
            console.log(players);
            
        } catch (error){

            if( error instanceof AppError){
                Alert.alert('Nova Pessoa', error.message);
            }else{
                console.log(error);
                Alert.alert('Nova Pessoa','Não foi possivel adicionar.');
            }
        }
    }

    return(
        <Container>
            <Header showBackButton/>
    
            <Highlight 
                title={group} 
                subtitle="Adcione a galera e separe os times"
            />


            <Form>
                <Input 
                    placeholder='Nome da Pessoa'
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                />

                <ButtonIcon
                    onPress={handleAddPlayers}
                    icon="add"
                />
            </Form>

            <HeaderList>
                <FlatList 
                    horizontal
                    data={['Time A','Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={()=> setTeam(item)}
                        />
                    )}
                />
                <NumbersOfPlayers>
                       {players.length}
                </NumbersOfPlayers>
            </HeaderList>

            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item} 
                        onRemove={() => {}}
                    />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <ListEmpty 
                    message="Não há pessoas nesse time."
                />
            )}
            contentContainerStyle={[
                {paddingBottom: 100},
                players.length === 0 && {flex: 1}
            ]}
            />

            <Button
                type='SECONDARY'
                title='Remover Turma'
            />
        </Container>
    );
}