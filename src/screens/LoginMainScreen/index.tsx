import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import {useSelector} from 'react-redux';
// @ts-ignore
import LogoDark from '../../assets/logoDark.svg';
// @ts-ignore
import LogoLight from '../../assets/logoLight.svg';
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import {
  JoinButton,
  JoinButtonText,
  LoginButton,
  LoginButtonText,
  ParentView,
  TermsText,
  WelcomeText,
} from './styles';

// @ts-ignore
function LoginMainScreen({navigation}) {
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (auth().currentUser != null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        // navigation.navigate('Home');
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <ParentView>
        <WithLocalSvg
          asset={!isDarkTheme ? LogoLight : LogoDark}
          width={deviceWidth - 48}
        />
        <View>
          <WelcomeText style={fonts.medium}>Welcome !</WelcomeText>
          <JoinButton onPress={() => navigation.navigate('Join')}>
            <JoinButtonText style={fonts.bold}>가입</JoinButtonText>
          </JoinButton>
          <LoginButton onPress={() => navigation.navigate('Login')}>
            <LoginButtonText style={fonts.bold}>로그인</LoginButtonText>
          </LoginButton>
        </View>
        <TermsText style={fonts.bold}>
          위의 선택지 중 한개를 누름으로서, 플랜케이션의 서비스 이용약관과
          개인정보처리방침에 동의한 것으로 간주합니다.
        </TermsText>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default LoginMainScreen;

const deviceWidth: number = Dimensions.get('window').width;
// const deviceHeight: number = Dimensions.get("window").height;
