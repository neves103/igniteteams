import { TextInputProps } from 'react-native';
import { useTheme} from 'styled-components/native';//IMPORTANDO O useTheme  do styled-components para usar as cores do objeto themes

import { Container }from './styles';

export function Input({...rest}:TextInputProps){
const {COLORS} = useTheme(); //DESESTRUTURANDO PARA PEGAR ACOR DO OBJETO THEMES
    return(
        <Container
            placeholderTextColor={COLORS.GRAY_300}  //DESESTRUTURANDO PARA PEGAR ACOR DO OBJETO THEMES NO placeholder
            {...rest} 
        />
    );
}