import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Form, HeaderList, NumbersOfPlayers} from './styles';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

import { useRoute } from '@react-navigation/native';
import { Alert, FlatList, TextInput } from 'react-native';
import { AppError } from '@utils/AppError';

import { PlayerCard } from '@components/PlayerCard';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';

type RouterParams = {
    group: string;
}

export function Players(){
    const [loading, setLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();

    const route = useRoute();
    const { group } = route.params as RouterParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handlePlayerRemove(playerName: string){
        try{
            await playerRemoveByGroup(playerName, group );
            fetchPlayersByTeam();
        } catch (error){
            console.log(error);
            Alert.alert('Remover Pessoas', 'Não foi possivel remover a pessoa ');
        }
    }

    async function fetchPlayersByTeam(){
        try{
            setLoading(true);   

            const playersByTeam = await playersGetByGroupAndTeam(group,team);

            setPlayers(playersByTeam);

        } catch (error){
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado');
        }finally {
            setLoading(false);
        }
    }

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
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName('');
            fetchPlayersByTeam();
            
        } catch (error){

            if( error instanceof AppError){
                Alert.alert('Nova Pessoa', error.message);
            }else{
                console.log(error);
                Alert.alert('Nova Pessoa','Não foi possivel adicionar.');
            }
        }
    }

    async function groupRemove(){
        try{
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
            Alert.alert('Remover Grupo', 'Não foi possivel remover o grupo.');
        }
    }

    async function handleRemoveGroup(){
        Alert.alert(
            'Remover',
            'Deseja remover o turma ?', 
            [
                { text: 'Não', style:'cancel'},
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        );
    }

    useEffect(()=> {
        fetchPlayersByTeam();
    }, [team]);

    return(
        <Container>
            <Header showBackButton/>
    
            <Highlight 
                title={group} 
                subtitle="Adcione a galera e separe os times"
            />


            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    placeholder='Nome da Pessoa'
                    value={newPlayerName}
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayers}
                    returnKeyType="done"
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
            
            {
                loading ? <Loading/> : 
                <FlatList 
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard 
                            name={item.name} 
                            onRemove={() => handlePlayerRemove(item.name)}
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
            }

            <Button
                type='SECONDARY'
                title='Remover Turma'
                onPress={handleRemoveGroup}
            />
        </Container>
    );
}