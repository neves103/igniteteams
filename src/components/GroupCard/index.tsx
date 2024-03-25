import  {Container, Title, Icon} from './styles';
import { TouchableOpacityProps } from 'react-native'; // estou importando a tipagem do TouchbleOpacity

type Props = TouchableOpacityProps &{ //estou usando essa tipagem no meu componente
    title: string
}

export function GroupCard( {title, ...rest}: Props){
    return(
        <Container {...rest}>
            <Icon />
            <Title>
                {title}
             </Title>
        </Container>
    );
}