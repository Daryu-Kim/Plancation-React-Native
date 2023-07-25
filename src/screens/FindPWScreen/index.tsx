import auth from '@react-native-firebase/auth';
import {SetStateAction, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import Toast from "react-native-toast-message";
import {useSelector} from 'react-redux';
// @ts-ignore
import LogoDark from '../../assets/logoDarkWithoutGradient.svg';
// @ts-ignore
import LogoLight from '../../assets/logoLightWithoutGradient.svg';
import FirebaseExceptionMessage from "../../modules/FirebaseExceptionMessage";
import {RootState} from '../../reducers';
import fonts from '../../styles/fonts';
import {deviceWidth, size} from '../../styles/globalStyles';
import {
  EmailInputText,
  Header,
  HeaderText,
  KeyboardAvoidView,
  Main,
  ParentView,
  SendButton,
  SendButtonText,
  TitleText,
} from './styles';

// @ts-ignore
function FindPWScreen({navigation}) {
  const [email, setEmail] = useState('');
  const isDarkTheme: boolean =
    useSelector((state: RootState) => state.theme) === 'dark';
  const hintTextColor = isDarkTheme ? '#8f91c7b3' : '#494b7c80';

  return (
    <SafeAreaProvider>
      <ParentView>
        <KeyboardAvoidView>
          <Header>
            <HeaderText style={fonts.bold}>
              비밀번호를{'\n'}잊으셨나요?
            </HeaderText>
            <WithLocalSvg
              asset={!isDarkTheme ? LogoLight : LogoDark}
              width={size(72)}
            />
          </Header>
          <Main>
            <View>
              <TitleText style={fonts.bold}>
                비밀번호를 재설정하려는 계정(이메일)을 입력해주세요.
              </TitleText>
              <EmailInputText
                placeholder="이메일"
                autoFocus
                onChangeText={(emailText: SetStateAction<string>) =>
                  setEmail(emailText)
                }
                keyboardType={'email-address'}
                placeholderTextColor={hintTextColor}
              />
            </View>
            <SendButton
              onPress={() => sendEmailForResetPassword(navigation, email)}>
              <SendButtonText style={fonts.bold}>이메일 전송</SendButtonText>
            </SendButton>
          </Main>
        </KeyboardAvoidView>
      </ParentView>
    </SafeAreaProvider>
  );
}

export default FindPWScreen;

async function sendEmailForResetPassword(context: any, email: string) {
  try {
    if (email.length === 0) {
      Toast.show({
        type: 'error',
        text1: '이메일 필드가 비어있습니다!',
      });

      return;
    }
    await auth().sendPasswordResetEmail(email);
    Toast.show({
      type: 'success',
      text1: '재설정 링크를 메일로 보냈습니다!',
    });
    context.goBack();
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: FirebaseExceptionMessage(error),
    });
    console.error(error);
  }
}
