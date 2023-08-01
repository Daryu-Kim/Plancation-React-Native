import {KeyboardAvoidingView} from 'react-native';
import {SelectList} from "react-native-dropdown-select-list/index";
import {SafeAreaView} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import styled from 'styled-components/native';
import colors from "./styles/colors";
import { size } from "./styles/globalStyles";

export const ParentView = styled(SafeAreaView)`
  background-color: ${props => props.theme.color.background};
  padding: ${size(36)} 0;
  flex: 1;
`;

export const UserView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${size(24)};
`;

export const UserName = styled.Text`
  font-size: ${size(16)};
  color: ${props => props.theme.color.text};
  width: 50%;
`;

export const MenuView = styled.TouchableOpacity`
  height: ${size(52)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${size(24)};
`;

export const MenuInnerView = styled.View`
  flex-direction: row;
  gap: ${size(8)};
  align-items: center;
`;

export const MenuText = styled.Text`
  font-size: ${size(12)};
  color: ${props => props.theme.color.text};
`;

export const MenuCalendarText = styled.Text`
  font-size: ${size(12)};
  color: ${props => props.theme.color.text};
`;

export const MenuDivider = styled.View`
  width: 100%;
  height: ${size(1)};
  background-color: ${props => props.theme.color.divider};
`;
