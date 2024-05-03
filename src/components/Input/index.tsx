import { TextInput, TextInputProps } from 'react-native';
import { useTheme} from 'styled-components/native';//IMPORTANDO O useTheme  do styled-components para usar as cores do objeto themes

import { Container }from './styles';
type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;

}

export function Input({inputRef, ...rest}:Props){
const {COLORS} = useTheme(); //DESESTRUTURANDO PARA PEGAR ACOR DO OBJETO THEMES
    return(
        <Container
            ref={ inputRef }
            placeholderTextColor={COLORS.GRAY_300} //DESESTRUTURANDO PARA PEGAR ACOR DO OBJETO THEMES NO placeholder
            {...rest} 
        />
    );
}