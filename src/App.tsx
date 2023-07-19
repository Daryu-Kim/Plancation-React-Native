import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';

import {RootState} from './reducers';
import {setTheme} from './reducers/themeSlice';
import {dark, light} from './styles/theme';

import LoginMainScreen from './screens/LoginMainScreen';
import LoginScreen from './screens/LoginScreen';
import {firebaseApp} from './functions/Firebase';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(setTheme(colorScheme));
    });

    return () => subscription.remove();
  }, [dispatch]);

  firebaseApp();

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={LoginMainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
