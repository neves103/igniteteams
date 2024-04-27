import AsyncStorage from '@react-native-async-storage/async-storage';

import { groupsGetAll } from './groupsGetAll';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string){
    try{

        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroup);
        if(groupAlreadyExists){
            throw new AppError('já existe um grupo cadastrado com esse nome.');
        }
        const newGroups = [...storedGroups, newGroup];
        await AsyncStorage.setItem(GROUP_COLLECTION,JSON.stringify(newGroups));
    }catch(error){
        throw error;
    }

}