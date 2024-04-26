import AsyncStorage from '@react-native-async-storage/async-storage';

import { groupsGetAll } from './groupsGetAll';
import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupCreate(newGroup: string){
    try{

        const storedGroups = await groupsGetAll();
        const newGroups = [...storedGroups, newGroup];
        await AsyncStorage.setItem(GROUP_COLLECTION,JSON.stringify(newGroups));
    }catch(error){
        throw error;
    }

}