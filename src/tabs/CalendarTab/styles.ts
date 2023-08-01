import {KeyboardAvoidingView} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { size } from "../../styles/globalStyles";

export const ParentView = styled(SafeAreaView)`
  background-color: ${props => props.theme.color.background};
  flex: 1;
`;

export const KeyboardAvoidView = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: space-between;
  display: flex;
`;

export const Divider = styled.View`
  width: 100%;
  height: ${size(1)};
  background-color: ${props => props.theme.color.divider};
`;

export const ScheduleView = styled.View`
  flex: 1;
  padding: ${size(16)} ${size(24)};
`;

export const ScheduleDateText = styled.Text`
  font-size: ${size(14)};
  color: ${props => props.theme.color.text};
`;

export const ScheduleFormBottomSheet = styled(RBSheet)``;
