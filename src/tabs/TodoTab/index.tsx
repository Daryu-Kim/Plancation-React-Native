import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SetStateAction, useState} from 'react';
import {View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import Toast from 'react-native-toast-message';
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
import FirebaseExceptionMessage from "../../modules/FirebaseExceptionMessage";
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import {deviceWidth} from '../../styles/globalStyles';
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
function TodoTab({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';
  const hintTextColor = isDarkTheme ? '#8f91c7b3' : '#494b7c80';
  const hidePasswordColor = hidePassword ? hintTextColor : '#735bf2';

  async function onPressedLoginButton() {
    if (email.length === 0 || password.length === 0) {
      Toast.show({
        type: 'log',
        text1: '로그인 오류',
        text2: '빈 필드가 있습니다!',
      });

      return;
    }
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(credential => {
          EncryptedStorage.setItem('currentCalendar', credential.user.uid).then(
            _ => {
              // Go To HomeScreen
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            },
          );
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: FirebaseExceptionMessage(error),
          });
          console.error(error.code);
        });
    } catch (e) {
      console.error(e);
    }
  }

  const onPressedGoogleLoginButton = async () => {
    GoogleSignin.configure({
      webClientId:
        '33008958055-9a5g8qkd4702t6sihtop7t0c07gsqqio.apps.googleusercontent.com',
    });
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      const userDocument = await firestore()
        .collection('Users')
        .doc(userCredential.user.uid)
        .get();

      if (userDocument.exists) {
        await setCurrentCalendar(userCredential.user.uid);
      } else {
        const isCreatedUserData: boolean = await createUserDataInFirestore(
          userCredential.user,
        );
        const isCreatedCalendar: boolean = await createCalendarInFirestore(
          userCredential.user,
        );
        if (isCreatedUserData && isCreatedCalendar) {
          await setCurrentCalendar(userCredential.user.uid);
        }
      }
      // return
    } catch (error) {
      console.error(error);
    }
  };

  const onPressedHidePasswordButton = (): void =>
    setHidePassword(!hidePassword);

  const createUserDataInFirestore = async (
    user: FirebaseAuthTypes.User,
  ): Promise<boolean> => {
    try {
      await firestore().collection('Users').doc(user.uid).set({
        userID: user.uid,
        userImagePath: user.photoURL,
        userName: user.displayName,
      });

      return true;
    } catch (e) {
      return false;
    }
  };

  const createCalendarInFirestore = async (
    user: FirebaseAuthTypes.User,
  ): Promise<boolean> => {
    try {
      await firestore()
        .collection('Calendars')
        .doc(user.uid)
        .set({
          calendarAuthorID: user.uid,
          calendarTitle: '개인',
          calendarUsers: [user.uid],
          calendarID: user.uid,
        });

      return true;
    } catch (e) {
      return false;
    }
  };

  const setCurrentCalendar = async (uid: string): Promise<void> => {
    await EncryptedStorage.setItem('currentCalendar', uid);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

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
              <WithLocalSvg
                asset={Google}
                width={parseFloat(deviceWidth) * 24}
                height={parseFloat(deviceWidth) * 24}
              />
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

export default TodoTab;
