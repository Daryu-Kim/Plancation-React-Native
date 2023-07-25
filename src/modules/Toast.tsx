import {JSX} from 'react';
import {BaseToast, BaseToastProps} from 'react-native-toast-message';

export const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderRadius: 6, borderLeftColor: '#66FF66', width: '90%'}}
      contentContainerStyle={{paddingHorizontal: 16}}
      text1Style={{
        fontFamily: 'Pretendard-Bold',
        fontSize: 16,
      }}
      text2Style={{
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
      }}
    />
  ),
  warn: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderRadius: 6, borderLeftColor: '#FFFF66', width: '90%'}}
      contentContainerStyle={{paddingHorizontal: 16}}
      text1Style={{
        fontFamily: 'Pretendard-Bold',
        fontSize: 16,
      }}
      text2Style={{
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
      }}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderRadius: 6, borderLeftColor: '#FF6666', width: '90%'}}
      contentContainerStyle={{paddingHorizontal: 16}}
      text1Style={{
        fontFamily: 'Pretendard-Bold',
        fontSize: 14,
      }}
      text2Style={{
        fontFamily: 'Pretendard-Medium',
      }}
    />
  ),
  log: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderRadius: 6, borderLeftColor: '#AAAAAA', width: '90%'}}
      contentContainerStyle={{paddingHorizontal: 16}}
      text1Style={{
        fontFamily: 'Pretendard-Bold',
        fontSize: 16,
      }}
      text2Style={{
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
      }}
    />
  ),
};
