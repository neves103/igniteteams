import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export type FilterStyleProps = {
    isActive: boolean;
}

export const Container = styled(TouchableOpacity) <FilterStyleProps>`
${({theme, isActive}) => isActive && css`
        border: 1px solid ${({theme}) => theme.COLORS.GREEN_700};
    `}

    border-radius: 4px;
    margin-right: 12px;

    height: 38px;
    width: 70px;

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    text-transform: uppercase;

    ${({theme}) => css`
        font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
        font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
        color: ${({theme}) => theme.COLORS.WHITE};
    `}
`;
    