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
function CalendarTab({navigation}) {

  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';

  return (
    <SafeAreaProvider>
      <ParentView>
        <KeyboardAvoidView>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <JoinButtonText>asdfasdf</JoinButtonText>
          </View>
        </KeyboardAvoidView>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default CalendarTab;
