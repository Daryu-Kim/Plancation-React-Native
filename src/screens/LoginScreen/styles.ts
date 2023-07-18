import {KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {size} from '../../styles/globalStyles';

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
