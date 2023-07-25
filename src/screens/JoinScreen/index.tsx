import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {SetStateAction, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
// @ts-ignore
import Eye from '../../assets/ic_eye.svg';
// @ts-ignore
import EyeClose from '../../assets/ic_eye_close.svg';
// @ts-ignore
import LogoDark from '../../assets/logoDarkWithoutGradient.svg';
// @ts-ignore
import LogoLight from '../../assets/logoLightWithoutGradient.svg';
import FirebaseExceptionMessage from '../../modules/FirebaseExceptionMessage';
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import {deviceWidth, size} from '../../styles/globalStyles';
import {
  EmailInputText,
  Header,
  HeaderText,
  HidePasswordButton,
  HidePasswordImage,
  JoinButton,
  JoinButtonText,
  KeyboardAvoidView,
  Main,
  NameInputText,
  ParentView,
  PasswordInputLayout,
  PasswordInputText,
} from './styles';

// @ts-ignore
function JoinScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRetryPassword, setHideRetryPassword] = useState(true);
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';
  const hintTextColor = isDarkTheme ? '#8f91c7b3' : '#494b7c80';
  const hidePasswordColor = hidePassword ? hintTextColor : '#735bf2';
  const hideRetryPasswordColor = hideRetryPassword ? hintTextColor : '#735bf2';

  return (
    <SafeAreaProvider>
      <ParentView>
        <KeyboardAvoidView>
          <Header>
            <HeaderText style={fonts.bold}>Plancation{'\n'}회원가입</HeaderText>
            <WithLocalSvg
              asset={!isDarkTheme ? LogoLight : LogoDark}
              width={size(72)}
            />
          </Header>
          <Main>
            <View>
              <EmailInputText
                placeholder="이메일"
                autoFocus
                onChangeText={(emailText: SetStateAction<string>) =>
                  setEmail(emailText)
                }
                keyboardType={'email-address'}
                placeholderTextColor={hintTextColor}
              />
              <NameInputText
                placeholder="이름"
                autoFocus
                onChangeText={(nameText: SetStateAction<string>) =>
                  setName(nameText)
                }
                keyboardType={'default'}
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
                <HidePasswordButton
                  onPress={() =>
                    onPressedHidePasswordButton(setHidePassword, hidePassword)
                  }>
                  <HidePasswordImage
                    asset={hidePassword ? Eye : EyeClose}
                    width={parseFloat(deviceWidth) * 28}
                    height={parseFloat(deviceWidth) * 28}
                    fill={hidePasswordColor}
                  />
                </HidePasswordButton>
              </PasswordInputLayout>
              <PasswordInputLayout>
                <PasswordInputText
                  placeholder="비밀번호 확인"
                  secureTextEntry={hideRetryPassword}
                  keyboardType={'default'}
                  onChangeText={(retryPasswordText: SetStateAction<string>) =>
                    setRetryPassword(retryPasswordText)
                  }
                  placeholderTextColor={hintTextColor}
                />
                <HidePasswordButton
                  onPress={() =>
                    onPressedHidePasswordButton(
                      setHideRetryPassword,
                      hideRetryPassword,
                    )
                  }>
                  <HidePasswordImage
                    asset={hideRetryPassword ? Eye : EyeClose}
                    width={parseFloat(deviceWidth) * 28}
                    height={parseFloat(deviceWidth) * 28}
                    fill={hideRetryPasswordColor}
                  />
                </HidePasswordButton>
              </PasswordInputLayout>
            </View>
            <JoinButton
              onPress={() =>
                onPressedJoinUserButton(
                  navigation,
                  email,
                  name,
                  password,
                  retryPassword,
                )
              }>
              <JoinButtonText style={fonts.bold}>가입하기</JoinButtonText>
            </JoinButton>
          </Main>
        </KeyboardAvoidView>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default JoinScreen;

async function onPressedJoinUserButton(
  // tslint:disable-next-line:no-any
  context: any,
  email: string,
  name: string,
  password: string,
  retryPassword: string,
) {
  try {
    if (
      email.length === 0 ||
      name.length === 0 ||
      password.length === 0 ||
      retryPassword.length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: '비어있는 필드가 있습니다!',
      });

      return;
    }

    if (password !== retryPassword) {
      Toast.show({
        type: 'error',
        text1: '비밀번호가 일치하지 않습니다!',
      });

      return;
    }

    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);

    await changeUserName(userCredential.user, name);
    await createUserCalendar();
    await createUserData();

    context.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: FirebaseExceptionMessage(error),
    });
    console.error(error);
  }
}

const changeUserName = async (user: FirebaseAuthTypes.User, name: string) => {
  try {
    if (user != null) {
      await user.updateProfile({
        displayName: name,
      });
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: FirebaseExceptionMessage(error),
    });
  }
};

const createUserCalendar = async () => {
  try {
    await firestore()
      .collection('Calendars')
      .doc(auth().currentUser?.uid)
      .set({
        calendarUsers: [auth().currentUser?.uid],
        calendarAuthorID: auth().currentUser?.uid,
        calendarID: auth().currentUser?.uid,
        calendarTitle: '내 캘린더',
      });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: FirebaseExceptionMessage(error),
    });
  }
};

const createUserData = async () => {
  try {
    await firestore().collection('Users').doc(auth().currentUser?.uid).set({
      userID: auth().currentUser?.uid,
      userImagePath: null,
      userName: auth().currentUser?.displayName,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: FirebaseExceptionMessage(error),
    });
  }
};

const onPressedHidePasswordButton = (
  command: React.Dispatch<SetStateAction<boolean>>,
  isChecked: boolean,
): void => command(!isChecked);
