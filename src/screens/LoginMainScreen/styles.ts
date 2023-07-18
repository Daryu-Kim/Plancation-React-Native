import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const ParentView = styled(SafeAreaView) `
  background-color: ${props => props.theme.color.background};
  padding: 16px 24px;
  flex: 1;
  justify-content: space-between;
  display: flex;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 42px;
  border-radius: 100px;
  background: ${props => props.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.inverse_text};
  font-size: 18px;
`;
