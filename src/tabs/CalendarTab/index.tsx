import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {format, parse} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import ScheduleForm from "../../components/ScheduleForm";
import {RootState} from '../../reducers';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {size} from '../../styles/globalStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Divider,
  KeyboardAvoidView,
  ParentView,
  ScheduleDateText,
  ScheduleView,
} from './styles';

// @ts-ignore
function CalendarTab({navigation}) {
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';
  const [schedules, setSchedules] =
    useState<FirebaseFirestoreTypes.DocumentData[]>();
  const [markedDates, setMarkedDates] = useState();
  const [isModify, setIsModify] = useState<boolean>();
  const [dayOfStartRange, setDayOfStartRange] = useState<Date>(new Date());
  const [dayOfEndRange, setDayOfEndRange] = useState<Date>(new Date());

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const posts = [
    {
      id: 1,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2023-07-26',
    },
    {
      id: 2,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2023-07-28',
    },
  ];

  useEffect(() => {
    setDayOfStartRange(new Date(selectedDate));
    setDayOfEndRange(new Date(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const startOfMonth = new Date(Date.parse(selectedDate));
    const endOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);
    endOfMonth.setUTCFullYear(
      startOfMonth.getUTCFullYear(),
      startOfMonth.getUTCMonth() + 1,
      0,
    );
    endOfMonth.setUTCHours(23, 59, 59, 999);

    firestore()
      .collection('Calendars')
      .doc(auth().currentUser?.uid)
      .collection('Schedules')
      .where('scheduleTime', '>=', startOfMonth)
      .where('scheduleTime', '<=', endOfMonth)
      .get()
      .then(snapshots => {
        const tempDates: string[] = [];
        snapshots.forEach(schedule => {
          console.error(schedule.data());
          // 여기서 Break 걸림. 해결 바람.
          tempDates.push(
            format(new Date(schedule.data().scheduleTime), 'yyyy-MM-dd'),
          );
        });

        const tempMarkedDates = tempDates.reduce((acc, current) => {
          const formattedDate = format(new Date(current), 'yyyy-MM-dd');
          acc[formattedDate] = {marked: true};

          return acc;
        }, {});

        const markedSelectedDates = {
          ...tempMarkedDates,
          [selectedDate]: {
            selected: true,
            marked: tempMarkedDates[selectedDate]?.marked,
          },
        };
        setMarkedDates(markedSelectedDates);
      })
      .catch(_ => {
        console.error("없음");
      });
  }, [selectedDate]);

  useEffect(() => {
    const startOfDay = new Date(Date.parse(selectedDate));
    const endOfDay = new Date(Date.parse(selectedDate));
    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);
    firestore()
      .collection('Calendars')
      .doc(auth().currentUser?.uid)
      .collection('Schedules')
      .where('scheduleTime', '>=', startOfDay)
      .where('scheduleTime', '<=', endOfDay)
      .get()
      .then(events => {
        const tempSchedules: FirebaseFirestoreTypes.DocumentData[] = [];
        events.forEach(event => {
          tempSchedules.push(event.data());
        });
        setSchedules(tempSchedules);
        console.log(schedules);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedDate]);



  const refRBSheet = useRef();

  // @ts-ignore
  return (
    <SafeAreaProvider>
      <ParentView>
        <KeyboardAvoidView>
          <View style={{flex: 1}}>
            <Calendar
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              theme={{
                dotColor: colors(isDarkTheme, 'accentColor'),
                calendarBackground: colors(isDarkTheme, 'backgroundColor'),
                backgroundColor: colors(isDarkTheme, 'backgroundColor'),
                textDisabledColor: colors(isDarkTheme, 'hintTextColor'),
                dayTextColor: colors(isDarkTheme, 'textColor'),
                arrowColor: colors(isDarkTheme, 'accentColor'),
                selectedDayTextColor: colors(isDarkTheme, 'whiteColor'),
                selectedDayBackgroundColor: colors(isDarkTheme, 'accentColor'),
                todayTextColor: colors(isDarkTheme, 'accentColor'),
                monthTextColor: colors(isDarkTheme, 'textColor'),
                textDayFontFamily: 'Pretendard-Medium',
                textDayFontSize: parseInt(size(14), 10),
                textMonthFontFamily: 'Pretendard-Bold',
                textMonthFontSize: parseInt(size(16), 10),
                textDayHeaderFontFamily: 'Pretendard-Medium',
                textDayHeaderFontSize: parseInt(size(12), 10),
              }}
              style={{
                marginVertical: parseInt(size(8), 10),
                marginHorizontal: parseInt(size(8), 10),
              }}
              markedDates={markedDates}
              monthFormat='yyyy년 M월'
            />
            <Divider />
            <ScheduleView>
              <ScheduleDateText style={fonts.bold}>
                {format(Date.parse(selectedDate), 'M월 d일 EEEE', {locale: ko})}
              </ScheduleDateText>
              <View style={{flex: 1, width: '100%', marginTop: parseInt(size(12), 10)}}>
                {schedules?.map((value, index) => (
                  <Text key={index}>{value.scheduleID}</Text>
                ))}
                <Button
                  title="수정"
                  onPress={() => {
                    setIsModify(true);
                    refRBSheet.current.open();
                  }}
                />
                <Button
                  title="생성"
                  onPress={() => {
                    setIsModify(false);
                    refRBSheet.current.open();
                  }}
                />
              </View>
            </ScheduleView>
          </View>
        </KeyboardAvoidView>
      </ParentView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPresssMask={false}
        dragFromTopOnly
        animationType="fade"
        height={parseInt(size(320), 10)}
        customStyles={{
          container: {
            backgroundColor: colors(isDarkTheme, 'backgroundColor'),
            borderRadius: parseInt(size(28), 10),
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <ScheduleForm isDarkTheme={isDarkTheme} isModify={isModify} startDay={dayOfStartRange} endDay={dayOfEndRange} />
      </RBSheet>
    </SafeAreaProvider>
  );
}

export default CalendarTab;
