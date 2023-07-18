import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import {
  LoginButton,
  LoginButtonText,
  ParentView,
} from './styles';

// @ts-ignore
function LoginMainScreen({navigation}) {
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';

  return (
    <SafeAreaProvider>
      <ParentView>
        <LoginButton onPress={() => navigation.navigate('Login')}>
          <LoginButtonText style={fonts.bold}>로그인</LoginButtonText>
        </LoginButton>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default LoginMainScreen;
