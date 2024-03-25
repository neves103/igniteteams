import {Container, Message} from './styles';

type props = {
    message: string
}

export function ListEmpty({message}: props){
    return(
        <Container>
            <Message>{message}</Message>
        </Container>
    );
}