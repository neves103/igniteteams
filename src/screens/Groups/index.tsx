import { useState, useCallback} from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Container} from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { isLoading } from 'expo-font';


export  function Groups(){
  const [loading, setLoading] = useState(true);
  const [ group, setGroup ] = useState<string[]>([]);

  const navigation = useNavigation();


  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try{
      setLoading(true);

      const data = await groupsGetAll();
      setGroup(data);

    } catch (error){
      console.log(error);
      Alert.alert('Turmas', 'Não foi possivel carregar as turmas.');
    }finally {
      setLoading(false);
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group});
  }

  useFocusEffect(useCallback(() => {
      fetchGroups();
    }, []));

  return (
    <Container>
      <Header />

      <Highlight 
        title="Turmas" 
        subtitle="Jogue com a sua turma"
      />

      {
        loading ? <Loading /> :
      
        <FlatList
          data={group}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={group.length === 0 && {flex: 1}}
          ListEmptyComponent={() => (
              <ListEmpty 
                message="Que tal cadastrar a primeira turma? "
              />
          )}
          showsVerticalScrollIndicator={false}
          />
      }

        <Button 
          title="Criar nova turma"
          onPress={handleNewGroup}
        />

    </Container>
  );
};
