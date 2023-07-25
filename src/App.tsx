import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {toastConfig} from './modules/Toast';

import {RootState} from './reducers';
import {setTheme} from './reducers/themeSlice';
import FindPWScreen from './screens/FindPWScreen';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from "./screens/JoinScreen";
import LoginMainScreen from './screens/LoginMainScreen';
import LoginScreen from './screens/LoginScreen';
import {size} from './styles/globalStyles';
import {dark, light} from './styles/theme';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

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
        <Stack.Navigator initialRouteName={user ? 'Home' : 'LoginMain'}>
          <Stack.Screen
            name="LoginMain"
            component={LoginMainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Join"
            component={JoinScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FindPW"
            component={FindPWScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={parseInt(size(16), 10)} />
    </ThemeProvider>
  );
};

export default App;
