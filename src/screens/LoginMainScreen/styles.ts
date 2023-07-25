import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {size} from '../../styles/globalStyles';

export const ParentView = styled(SafeAreaView)`
  background-color: ${props => props.theme.color.background};
  padding: ${size(16)} ${size(24)};
  flex: 1;
  justify-content: space-between;
  display: flex;
`;

export const WelcomeText = styled.Text`
  text-align: center;
  font-size: ${size(18)};
  color: ${props => props.theme.color.primary};
`;

export const TermsText = styled.Text`
  text-align: center;
  font-size: ${size(12)};
  color: ${props => props.theme.color.hint_text};
`;

export const JoinButton = styled.TouchableOpacity`
  width: 100%;
  height: ${size(42)};
  border-width: ${size(1)};
  border-style: solid;
  border-color: ${props => props.theme.color.primary};
  border-radius: ${size(100)};
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${size(24)};
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: ${size(42)};
  border-radius: ${size(100)};
  background: ${props => props.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${size(16)};
`;

export const JoinButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.primary};
  font-size: ${size(18)};
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.inverse_text};
  font-size: ${size(18)};
`;
