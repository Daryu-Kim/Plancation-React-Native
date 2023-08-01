import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {LegacyRef, useState} from "react";
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {size} from '../../styles/globalStyles';
import {
  ScheduleFormHeaderButton,
  ScheduleFormHeaderButtonText,
  ScheduleFormHeaderTitle,
  ScheduleFormHeaderView,
  ScheduleFormMainBox,
  ScheduleFormMainContentLeftButton,
  ScheduleFormMainContentRightButton,
  ScheduleFormMainContentText,
  ScheduleFormMainContentTitle,
  ScheduleFormMainDateBox,
  ScheduleFormMainDateContentBox,
  ScheduleFormMainDateMenuBox,
  ScheduleFormMainHorizontalDivider,
  ScheduleFormMainLeftMenu,
  ScheduleFormMainMenuText,
  ScheduleFormMainRightMenu,
  ScheduleFormMainTextInput,
  ScheduleFormMainVerticalDivider,
  ScheduleFormMainView,
} from './styles';

const ScheduleForm = (props: { isDarkTheme: boolean; isModify: boolean; startDay: number | Date; endDay: number | Date; }) => {
  const [isAllDayClicked, setIsAllDayClicked] = useState<boolean>(true);
  const [isRangeDayClicked, setIsRangeDayClicked] = useState<boolean>();

  return (
    <>
      <ScheduleFormHeaderView>
        <ScheduleFormHeaderButton
          onPress={() => {
            props.ref.current.close();
          }}>
          <ScheduleFormHeaderButtonText style={fonts.medium}>
            취소
          </ScheduleFormHeaderButtonText>
        </ScheduleFormHeaderButton>
        <ScheduleFormHeaderTitle style={fonts.bold}>
          {props.isModify ? '이벤트 수정' : '새로운 이벤트'}
        </ScheduleFormHeaderTitle>
        <ScheduleFormHeaderButton>
          <ScheduleFormHeaderButtonText style={fonts.medium}>
            {props.isModify ? '완료' : '등록'}
          </ScheduleFormHeaderButtonText>
        </ScheduleFormHeaderButton>
      </ScheduleFormHeaderView>
      <ScheduleFormMainView>
        <ScheduleFormMainBox>
          <ScheduleFormMainTextInput
            placeholder="일정 제목"
            keyboardType="default"
            placeholderTextColor={colors(props.isDarkTheme, 'hintTextColor')}
            style={fonts.bold}
            autoFocus
          />
        </ScheduleFormMainBox>
        <ScheduleFormMainDateBox>
          <ScheduleFormMainDateMenuBox>
            <ScheduleFormMainLeftMenu
              onPress={() => {
                setIsAllDayClicked(true);
                setIsRangeDayClicked(false);
              }}
              style={
                isAllDayClicked
                  ? {
                      backgroundColor: colors(props.isDarkTheme, 'accentColor'),
                    }
                  : {backgroundColor: 'transparent'}
              }>
              <ScheduleFormMainMenuText
                style={
                  isAllDayClicked
                    ? {color: colors(props.isDarkTheme, 'whiteColor')}
                    : {color: colors(props.isDarkTheme, 'textColor')}
                }>
                하루종일
              </ScheduleFormMainMenuText>
            </ScheduleFormMainLeftMenu>
            <ScheduleFormMainVerticalDivider />
            <ScheduleFormMainRightMenu
              onPress={() => {
                setIsAllDayClicked(false);
                setIsRangeDayClicked(true);
              }}
              style={
                isRangeDayClicked
                  ? {
                      backgroundColor: colors(props.isDarkTheme, 'accentColor'),
                    }
                  : {backgroundColor: 'transparent'}
              }>
              <ScheduleFormMainMenuText
                style={
                  isRangeDayClicked
                    ? {color: colors(props.isDarkTheme, 'whiteColor')}
                    : {color: colors(props.isDarkTheme, 'textColor')}
                }>
                구간설정
              </ScheduleFormMainMenuText>
            </ScheduleFormMainRightMenu>
          </ScheduleFormMainDateMenuBox>
          <ScheduleFormMainHorizontalDivider />
          <ScheduleFormMainDateContentBox>
            <ScheduleFormMainContentLeftButton disabled={isAllDayClicked}>
              <ScheduleFormMainContentTitle>시작</ScheduleFormMainContentTitle>
              <ScheduleFormMainContentText>
                {format(props.startDay, 'y년 M월 d일 EEEE', {locale: ko})}
              </ScheduleFormMainContentText>
            </ScheduleFormMainContentLeftButton>
            <ScheduleFormMainVerticalDivider />
            <ScheduleFormMainContentRightButton disabled={isAllDayClicked}>
              <ScheduleFormMainContentTitle>종료</ScheduleFormMainContentTitle>
              <ScheduleFormMainContentText>
                {format(props.endDay, 'y년 M월 d일 EEEE', {locale: ko})}
              </ScheduleFormMainContentText>
            </ScheduleFormMainContentRightButton>
          </ScheduleFormMainDateContentBox>
        </ScheduleFormMainDateBox>
        <ScheduleFormMainBox />
      </ScheduleFormMainView>
    </>
  );
};

export default ScheduleForm;
