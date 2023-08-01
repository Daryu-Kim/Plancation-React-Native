import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Appearance, TouchableOpacity, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {WithLocalSvg} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {toastConfig} from './modules/Toast';

import ArrowIconClose from './assets/ic_arrow_close.svg';
import ArrowIconOpen from './assets/ic_arrow_open.svg';
import SettingIcon from './assets/ic_setting.svg';
import {RootState} from './reducers';
import {setTheme} from './reducers/themeSlice';
import FindPWScreen from './screens/FindPWScreen';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import LoginMainScreen from './screens/LoginMainScreen';
import LoginScreen from './screens/LoginScreen';
import {
  MenuCalendarText,
  MenuDivider,
  MenuInnerView,
  MenuText,
  MenuView,
  ParentView,
  UserName,
  UserView,
} from './styles';
import colors from './styles/colors';
import fonts from './styles/fonts';
import {size} from './styles/globalStyles';
import {dark, light} from './styles/theme';

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [isOpenedCalendarList, setIsOpenedCalendarList] = useState(false);
  const [isOpenedUserList, setIsOpenedUserList] = useState(false);
  const [currentCalendarID, setCurrentCalendarID] = useState('');
  const [currentCalendarUsers, setCurrentCalendarUsers] = useState(['']);
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';

  const calendarList: object[] = [
    {key: '1', value: '1234'},
    {key: '2', value: '12345678'},
  ];

  const calendarUserList: object[] = [
    {key: '1', value: '강해민', disabled: true},
    {key: '2', value: '여상현', disabled: true},
  ];

  const getCurrentCalendarID = async () => {
    const calendarID = await EncryptedStorage.getItem('currentCalendar');
    if (calendarID != null) {
      await setCurrentCalendarID(calendarID);
      await getCurrentCalendarUserList();
      console.log(currentCalendarID, currentCalendarUsers);
    }
  };

  const getCurrentCalendarUserList = async () => {
    const calendarData = await firestore()
      .collection('Calendars')
      .doc(currentCalendarID)
      .get();
    if (calendarData.exists) {
      await setCurrentCalendarUsers(calendarData.data()!.calendarUsers);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getCurrentCalendarID();
    }, 1000);
    // getCalendarList();
  }, []);

  //
  // async function getCalendarList() {
  //   const calendars = await firestore()
  //     .collection('Calendars')
  //     .where('calendarUsers', 'array-contains', auth().currentUser?.uid)
  //     .get();
  //   calendars.docs.forEach((calendar, index) => {
  //     calendarData.push(calendar.data());
  //     calendarList.push({
  //       key: index.toString(),
  //       value: calendar.data().calendarTitle.toString(),
  //     });
  //   });
  // }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(setTheme(colorScheme));
    });

    return () => subscription.remove();
  }, [dispatch]);

  useEffect(() => {
    // @ts-ignore
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onAuthStateChanged(authUser: React.SetStateAction<undefined>) {
    setUser(authUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={user ? 'Home' : 'LoginMain'}
          screenOptions={{
            drawerPosition: 'left',
            headerShown: false,
          }}
          useLegacyImplementation={false}
          backBehavior="history"
          drawerContent={({navigation}) => (
            <ParentView>
              <UserView>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                  <UserAvatar
                    style={{width: parseInt(size(40), 10)}}
                    size={parseInt(size(40), 10)}
                    name={auth().currentUser?.displayName}
                    src={auth().currentUser?.photoURL}
                  />
                  <UserName
                    style={fonts.medium}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {auth().currentUser?.displayName}
                  </UserName>
                </View>
                <TouchableOpacity>
                  <WithLocalSvg
                    asset={SettingIcon}
                    width={parseInt(size(28), 10)}
                    height={parseInt(size(28), 10)}
                    fill={colors(isDarkTheme, 'primaryColor')}
                  />
                </TouchableOpacity>
              </UserView>
              <MenuDivider style={{marginTop: parseInt(size(36), 10)}} />
              <MenuView
                onPress={() => setIsOpenedCalendarList(!isOpenedCalendarList)}>
                <MenuInnerView>
                  <WithLocalSvg
                    asset={
                      isOpenedCalendarList ? ArrowIconOpen : ArrowIconClose
                    }
                    stroke={colors(isDarkTheme, 'primaryColor')}
                    width={parseInt(size(16), 10)}
                    height={parseInt(size(16), 10)}
                  />
                  <MenuText style={fonts.medium}>현재 캘린더</MenuText>
                </MenuInnerView>
                <MenuCalendarText style={fonts.bold}>asdf</MenuCalendarText>
              </MenuView>
              <MenuDivider />
              <MenuView
                onPress={() => setIsOpenedCalendarList(!isOpenedCalendarList)}>
                <MenuInnerView>
                  <WithLocalSvg
                    asset={ArrowIconClose}
                    stroke={colors(isDarkTheme, 'primaryColor')}
                    width={parseInt(size(16), 10)}
                    height={parseInt(size(16), 10)}
                  />
                  <MenuText style={fonts.medium}>새로운 캘린더 만들기</MenuText>
                </MenuInnerView>
              </MenuView>
              <MenuDivider />
              <MenuView
                onPress={() => setIsOpenedCalendarList(!isOpenedCalendarList)}>
                <MenuInnerView>
                  <WithLocalSvg
                    asset={ArrowIconClose}
                    stroke={colors(isDarkTheme, 'primaryColor')}
                    width={parseInt(size(16), 10)}
                    height={parseInt(size(16), 10)}
                  />
                  <MenuText style={fonts.medium}>캘린더에 유저 초대</MenuText>
                </MenuInnerView>
              </MenuView>
              <MenuDivider />
              <MenuView onPress={() => setIsOpenedUserList(!isOpenedUserList)}>
                <MenuInnerView>
                  <WithLocalSvg
                    asset={isOpenedUserList ? ArrowIconOpen : ArrowIconClose}
                    stroke={colors(isDarkTheme, 'primaryColor')}
                    width={parseInt(size(16), 10)}
                    height={parseInt(size(16), 10)}
                  />
                  <MenuText style={fonts.medium}>
                    현재 캘린더 참여자 목록
                  </MenuText>
                </MenuInnerView>
              </MenuView>
              <MenuDivider />
            </ParentView>
          )}>
          <Drawer.Screen name="LoginMain" component={LoginMainScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Join" component={JoinScreen} />
          <Drawer.Screen name="FindPW" component={FindPWScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={parseInt(size(16), 10)} />
    </ThemeProvider>
  );
};

export default App;
