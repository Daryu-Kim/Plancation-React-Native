import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import * as React from 'react';
import {Appearance, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {RootState} from './reducers';
import {setTheme} from './reducers/themeSlice';
import LoginMainScreen from './screens/LoginMainScreen';
import LoginScreen from './screens/LoginScreen';
import {dark, light} from './styles/theme';

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
