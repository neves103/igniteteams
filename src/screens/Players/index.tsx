import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useState } from 'react';

import { PlayerCard } from '@components/PlayerCard';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';

import { Container, Form, HeaderList, NumbersOfPlayers} from './styles';

type RouterParams = {
    group: string;
}

export function Players(){
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState(['Ewerton','Olivia','Maisa','kjljlkj','kjhlkjkk']);

    const route = useRoute();
    const { group } = route.params as RouterParams;

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
                />

                <ButtonIcon
                     
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