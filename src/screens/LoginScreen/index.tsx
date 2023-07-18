import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import {KeyboardAvoidView, ParentView} from './styles';

// @ts-ignore
function LoginScreen({navigation}) {
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';

  return (
    <SafeAreaProvider>
      <ParentView>
        <KeyboardAvoidView>

        </KeyboardAvoidView>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default LoginScreen;
