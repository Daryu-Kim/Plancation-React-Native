import {KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import styled from 'styled-components/native';
import { size } from "../../styles/globalStyles";

export const ParentView = styled(SafeAreaView)`
  background-color: ${props => props.theme.color.background};
  padding: ${size(16)} ${size(24)};
  flex: 1;
`;

export const KeyboardAvoidView = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: space-between;
  display: flex;
`;

export const Logo = styled(WithLocalSvg)`
  margin: 0 auto;
`;

export const EmailInputText = styled.TextInput`
  font-size: ${size(16)};
  width: 100%;
  color: ${props => props.theme.color.text};
  height: ${size(52)};
  margin-top: ${size(24)};
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

export const AnotherLoginTextLayout = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${size(8)};
`;

export const AnotherLoginTextDivider = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.hint_text};
  height: ${size(1)};
`;

export const AnotherLoginText = styled.Text`
  color: ${props => props.theme.color.hint_text};
  font-size: ${size(12)};
`;

export const GoogleLoginButton = styled.TouchableOpacity`
  width: 100%;
  height: ${size(42)};
  border-width: ${size(1)};
  border-style: solid;
  border-color: ${props => props.theme.color.primary};
  border-radius: ${size(100)};
  background: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${size(8)};
`;

export const GoogleLoginText = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.text};
  font-size: ${size(16)};
`;

export const FindPWButton = styled.TouchableOpacity`
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${size(16)};
`;

export const LoginButton = styled.TouchableOpacity`
  height: ${size(42)};
  width: 100%;
  border-radius: ${size(100)};
  background: ${props => props.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${size(16)};
`;

export const FindPWButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.primary};
  font-size: ${size(12)};
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.inverse_text};
  font-size: ${size(18)};
`;

export const JoinLayout = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${size(8)};
`;

export const JoinText = styled.Text`
  color: ${props => props.theme.color.hint_text};
  font-size: ${size(12)};
`;

export const JoinButton = styled.TouchableOpacity``;

export const JoinButtonText = styled.Text`
  color: ${props => props.theme.color.primary};
  font-size: ${size(12)};
`;
