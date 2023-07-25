// tslint:disable-next-line:no-any
export default function FirebaseExceptionMessage(error: any): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return '이메일 형식이 맞지 않습니다!';
    case 'auth/user-not-found':
      return '계정을 찾을 수 없습니다!';
    case 'auth/wrong-password':
      return '비밀번호가 일치하지 않습니다!';
    default:
      return '알 수 없는 오류입니다!';
  }
}
