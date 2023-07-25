import auth from '@react-native-firebase/auth';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {SetStateAction, useEffect, useState} from 'react';
import {View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
// @ts-ignore
import AccountIcon from '../../assets/ic_account.svg';
// @ts-ignore
import AIIcon from '../../assets/ic_ai.svg';
// @ts-ignore
import CalendarIcon from '../../assets/ic_calendar.svg';
// @ts-ignore
import DiaryIcon from '../../assets/ic_diary.svg';
// @ts-ignore
import TodoIcon from '../../assets/ic_todo.svg';
import MenuIcon from '../../assets/ic_menu.svg';
import SearchIcon from '../../assets/ic_search.svg';
import AlertIcon from '../../assets/ic_alert.svg';
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import CalendarTab from '../../tabs/CalendarTab';
import TodoTab from '../../tabs/TodoTab';
import {Header, HeaderButton, HeaderText} from './styles';

// @ts-ignore
function HomeScreen({navigation}) {
  const [headerTitle, setHeaderTitle] = useState('');
  const Tab = createBottomTabNavigator();
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';
  const primaryColor = isDarkTheme ? '#8f91c7' : '#494b7c';
  const backgroundColor = isDarkTheme ? '#161625' : '#FFF';
  const backgroundDividerColor = isDarkTheme ? '#262635' : '#EEE';
  const hintTextColor = isDarkTheme ? '#8f91c7b3' : '#494b7c80';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCalendarName(setHeaderTitle);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Header>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
            <HeaderButton
              onPress={() => {
                console.log('Menu');
              }}>
              <WithLocalSvg
                asset={MenuIcon}
                width={24}
                height={24}
                stroke={primaryColor}
                strokeWidth={2}
              />
            </HeaderButton>
            <HeaderText style={fonts.bold}>{headerTitle}</HeaderText>
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <HeaderButton
              onPress={() => {
                console.log('Search');
              }}>
              <WithLocalSvg
                asset={SearchIcon}
                width={24}
                height={24}
                stroke={primaryColor}
                strokeWidth={2}
              />
            </HeaderButton>
            <HeaderButton
              onPress={() => {
                console.log('Alert');
              }}>
              <WithLocalSvg
                asset={AlertIcon}
                width={24}
                height={24}
                stroke={primaryColor}
                strokeWidth={2}
              />
            </HeaderButton>
          </View>
        </View>
      </Header>
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          tabBarActiveTintColor: primaryColor,
          tabBarInactiveTintColor: hintTextColor,
          tabBarStyle: {
            backgroundColor,
            borderColor: backgroundDividerColor,
            borderTopWidth: 1,
            height: 52,
            paddingHorizontal: 16,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Pretendard-Medium',
          },
        }}>
        <Tab.Screen
          name="Calendar"
          component={CalendarTab}
          options={{
            title: '캘린더',
            tabBarIcon: ({focused}) => (
              <WithLocalSvg
                asset={CalendarIcon}
                width={24}
                height={24}
                fill={focused ? primaryColor : hintTextColor}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => {
              getCalendarName(setHeaderTitle);
            },
          }}
        />
        <Tab.Screen
          name="Todo"
          component={TodoTab}
          options={{
            title: '할 일',
            tabBarIcon: ({focused}) => (
              <WithLocalSvg
                asset={TodoIcon}
                width={24}
                height={24}
                fill={focused ? primaryColor : hintTextColor}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => {
              setHeaderTitle('할 일');
            },
          }}
        />
        <Tab.Screen
          name="AI"
          component={TodoTab}
          options={{
            title: 'AI',
            tabBarIcon: ({focused}) => (
              <WithLocalSvg
                asset={AIIcon}
                width={24}
                height={24}
                fill={focused ? primaryColor : hintTextColor}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => {
              setHeaderTitle('AI 스케줄링');
            },
          }}
        />
        <Tab.Screen
          name="Diary"
          component={TodoTab}
          options={{
            title: '다이어리',
            tabBarIcon: ({focused}) => (
              <WithLocalSvg
                asset={DiaryIcon}
                width={24}
                height={24}
                fill={focused ? primaryColor : hintTextColor}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => {
              setHeaderTitle('기록');
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={TodoTab}
          options={{
            title: 'MY',
            tabBarIcon: ({focused}) => (
              <WithLocalSvg
                asset={AccountIcon}
                width={24}
                height={24}
                fill={focused ? primaryColor : hintTextColor}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => {
              setHeaderTitle('내 계정');
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
export default HomeScreen;

async function getCalendarName(
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const calendarID = await EncryptedStorage.getItem('currentCalendar');

    if (calendarID) {
      const calendarRef = firestore().collection('Calendars').doc(calendarID);
      const calendar = await calendarRef.get();

      if (calendar.exists) {
        const calendarData =
          calendar.data() as FirebaseFirestoreTypes.DocumentData;
        setHeaderTitle(calendarData.calendarTitle.toString());
      }
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: '캘린더 불러오기에 실패했습니다!',
    });
    console.error(error);
  }
}
