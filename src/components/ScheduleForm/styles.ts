import styled from "styled-components/native";
import {size} from "../../styles/globalStyles";

export const ScheduleFormHeaderView = styled.View`
  width: 100%;
  height: ${size(52)};
  background-color: ${props => props.theme.color.inverse_primary};
  padding: 0 ${size(32)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ScheduleFormHeaderTitle = styled.Text`
  font-size: ${size(16)};
  color: ${props => props.theme.color.white};
`;

export const ScheduleFormHeaderButton = styled.TouchableOpacity``;

export const ScheduleFormHeaderButtonText = styled.Text`
  font-size: ${size(14)};
  color: ${props => props.theme.color.white};
`;

export const ScheduleFormMainView = styled.View`
  padding: ${size(16)} ${size(32)};
  gap: ${size(16)};
`;

export const ScheduleFormMainBox = styled.View`
  border-radius: ${size(8)};
  border: ${size(1)} solid ${props => props.theme.color.hint_text};
  width: 100%;
  height: ${size(36)};
`;

export const ScheduleFormMainTextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  padding: 0 ${size(16)};
  font-size: ${size(12)};
`;

export const ScheduleFormMainDateBox = styled.View`
  border-radius: ${size(12)};
  border: ${size(1)} solid ${props => props.theme.color.hint_text};
  width: 100%;
`;

export const ScheduleFormMainDateMenuBox = styled.View`
  width: 100%;
  height: ${size(32)};
  flex-direction: row;
`;

export const ScheduleFormMainLeftMenu = styled.TouchableOpacity`
  border-radius: ${size(8)} 0 0 0;
  height: ${size(32)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScheduleFormMainRightMenu = styled.TouchableOpacity`
  border-radius: 0 ${size(8)} 0 0;
  height: ${size(32)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScheduleFormMainMenuText = styled.Text`
  font-size: ${size(12)};
  font-family: 'Pretendard-Bold';
`;

export const ScheduleFormMainVerticalDivider = styled.View`
  width: ${size(1)};
  height: 100%;
  background-color: ${props => props.theme.color.hint_text};
`;

export const ScheduleFormMainHorizontalDivider = styled.View`
  height: ${size(1)};
  width: 100%;
  background-color: ${props => props.theme.color.hint_text};
`;

export const ScheduleFormMainDateContentBox = styled.View`
  width: 100%;
  height: ${size(64)};
  flex-direction: row;
`;

export const ScheduleFormMainContentLeftButton = styled.TouchableOpacity`
  border-radius: ${size(8)} 0 0 0;
  height: ${size(64)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScheduleFormMainContentRightButton = styled.TouchableOpacity`
  border-radius: 0 ${size(8)} 0 0;
  height: ${size(64)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScheduleFormMainContentTitle = styled.Text`
  font-size: ${size(14)};
  color: ${props => props.theme.color.text};
  font-family: 'Pretendard-Bold';
`;

export const ScheduleFormMainContentText = styled.Text`
  font-size: ${size(12)};
  color: ${props => props.theme.color.text};
  font-family: 'Pretendard-Medium';
  margin-top: ${size(2)};
`;
