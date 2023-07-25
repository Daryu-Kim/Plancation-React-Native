import {KeyboardAvoidingView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WithLocalSvg} from "react-native-svg";
import styled from 'styled-components/native';
import {size} from '../../styles/globalStyles';

export const ParentView = styled(SafeAreaView)`
  background-color: ${props => props.theme.color.background};
  flex: 1;
  justify-content: space-between;
  display: flex;
`;

export const KeyboardAvoidView = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: space-between;
  display: flex;
`;

export const Header = styled.View`
  width: 100%;
  height: ${size(160)};
  background-color: ${props => props.theme.color.inverse_primary};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: ${size(16)} ${size(24)};
`;

export const HeaderText = styled.Text`
  font-size: ${size(24)};
  color: ${props => props.theme.color.white};
`;

export const Main = styled.View`
  width: 100%;
  flex: 1;
  padding: ${size(16)} ${size(24)};
  flex-direction: column;
  justify-content: space-between;
`;

export const EmailInputText = styled.TextInput`
  font-size: ${size(16)};
  width: 100%;
  color: ${props => props.theme.color.text};
  height: ${size(52)};
  border-bottom-width: ${size(1)};
  border-style: solid;
  border-color: ${props => props.theme.color.divider};
`;

export const NameInputText = styled.TextInput`
  font-size: ${size(16)};
  width: 100%;
  color: ${props => props.theme.color.text};
  height: ${size(52)};
  margin-top: ${size(16)};
  border-bottom-width: ${size(1)};
  border-style: solid;
  border-color: ${props => props.theme.color.divider};
`;

export const PasswordInputLayout = styled.View`
  height: ${size(52)};
  border-bottom-width: ${size(1)};
  border-style: solid;
  border-color: ${props => props.theme.color.divider};
  margin-top: ${size(16)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PasswordInputText = styled.TextInput`
  font-size: ${size(16)};
  color: ${props => props.theme.color.text};
  flex: 1;
`;

export const HidePasswordButton = styled.TouchableOpacity``;

export const HidePasswordImage = styled(WithLocalSvg)``;

export const JoinButton = styled.TouchableOpacity`
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
  color: ${props => props.theme.color.inverse_text};
  font-size: ${size(18)};
`;
