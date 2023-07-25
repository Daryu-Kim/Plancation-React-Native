import styled from 'styled-components/native';
import {size} from '../../styles/globalStyles';

export const Header = styled.View`
  width: 100%;
  height: ${size(64)};
  background-color: ${props => props.theme.color.inverse_primary};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: ${size(16)} ${size(24)};
`;

export const HeaderText = styled.Text`
  font-size: ${size(18)};
  color: ${props => props.theme.color.white};
`;

export const HeaderButton = styled.TouchableOpacity`
  width: ${size(24)};
  height: ${size(24)};
  display: flex;
  justify-content: center;
  align-items: center;
`;
