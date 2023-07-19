import {SetStateAction, useState} from 'react';
import {Alert, Dimensions, Platform, ToastAndroid, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import {useSelector} from 'react-redux';
// @ts-ignore
import Eye from '../../assets/ic_eye.svg';
// @ts-ignore
import EyeClose from '../../assets/ic_eye_close.svg';
// @ts-ignore
import Google from '../../assets/ic_google.svg';
// @ts-ignore
import LogoDark from '../../assets/logoDarkWithoutGradient.svg';
// @ts-ignore
import LogoLight from '../../assets/logoLightWithoutGradient.svg';
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import { deviceHeight, deviceWidth } from "../../styles/globalStyles";
import {
  AnotherLoginText,
  AnotherLoginTextDivider,
  AnotherLoginTextLayout,
  EmailInputText,
  FindPWButton,
  FindPWButtonText,
  GoogleLoginButton,
  GoogleLoginText,
  HidePasswordButton,
  HidePasswordImage,
  JoinButton,
  JoinButtonText,
  JoinLayout,
  JoinText,
  KeyboardAvoidView,
  LoginButton,
  LoginButtonText,
  Logo,
  ParentView,
  PasswordInputLayout,
  PasswordInputText,
} from './styles';

// @ts-ignore
function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';
  const hintTextColor = isDarkTheme ? '#8f91c7b3' : '#494b7c80';
  const hidePasswordColor = hidePassword ? hintTextColor : '#735bf2';

  const onPressedLoginButton = (): void => {
    switch (Platform.OS) {
      case 'android':
        ToastAndroid.show(`${email}, ${password}`, 1);
        break;
      case 'ios':
        Alert.alert('입력 내용', `${email}, ${password}`);
        break;
      default:
        break;
    }
  };

  const onPressedGoogleLoginButton = (): void => {
    switch (Platform.OS) {
      case 'android':
        ToastAndroid.show(`${email}, ${password}`, 1);
        break;
      case 'ios':
        Alert.alert('입력 내용', `${email}, ${password}`);
        break;
      default:
        break;
    }
  };

  const onPressedHidePasswordButton = (): void =>
    setHidePassword(!hidePassword);

  return (
    <SafeAreaProvider>
      <ParentView>
        <KeyboardAvoidView>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Logo
              asset={!isDarkTheme ? LogoLight : LogoDark}
              width={parseFloat(deviceWidth) * 160}
              height={parseFloat(deviceWidth) * 178}
            />
            <EmailInputText
              placeholder="이메일"
              autoFocus
              onChangeText={(emailText: SetStateAction<string>) =>
                setEmail(emailText)
              }
              keyboardType={'email-address'}
              placeholderTextColor={hintTextColor}
            />
            <PasswordInputLayout>
              <PasswordInputText
                placeholder="비밀번호"
                secureTextEntry={hidePassword}
                keyboardType={'default'}
                onChangeText={(passwordText: SetStateAction<string>) =>
                  setPassword(passwordText)
                }
                placeholderTextColor={hintTextColor}
              />
              <HidePasswordButton onPress={onPressedHidePasswordButton}>
                <HidePasswordImage
                  asset={hidePassword ? Eye : EyeClose}
                  width={parseFloat(deviceWidth) * 28}
                  height={parseFloat(deviceWidth) * 28}
                  fill={hidePasswordColor}
                />
              </HidePasswordButton>
            </PasswordInputLayout>
            <FindPWButton onPress={() => navigation.navigate('FindPW')}>
              <FindPWButtonText style={fonts.bold}>
                비밀번호를 잊어버리셨나요?
              </FindPWButtonText>
            </FindPWButton>
            <LoginButton onPress={onPressedLoginButton}>
              <LoginButtonText style={fonts.bold}>로그인</LoginButtonText>
            </LoginButton>
          </View>
          <View style={{gap: parseFloat(deviceWidth) * 16}}>
            <AnotherLoginTextLayout>
              <AnotherLoginTextDivider />
              <AnotherLoginText style={fonts.bold}>
                다른 방법으로 로그인
              </AnotherLoginText>
              <AnotherLoginTextDivider />
            </AnotherLoginTextLayout>
            <GoogleLoginButton onPress={onPressedGoogleLoginButton}>
              <WithLocalSvg asset={Google} width={parseFloat(deviceWidth) * 24} height={parseFloat(deviceWidth) * 24} />
              <GoogleLoginText style={fonts.bold}>
                Google로 로그인
              </GoogleLoginText>
            </GoogleLoginButton>
            <JoinLayout>
              <JoinText style={fonts.medium}>계정이 없으세요?</JoinText>
              <JoinButton>
                <JoinButtonText
                  style={fonts.bold}
                  onPress={() => navigation.navigate('Join')}>
                  회원가입 하러가기
                </JoinButtonText>
              </JoinButton>
            </JoinLayout>
          </View>
        </KeyboardAvoidView>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default LoginScreen;
