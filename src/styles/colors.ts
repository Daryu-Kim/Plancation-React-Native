const colors = {
  primaryColor: ['#494b7c', '#8f91c7'],
  inversePrimaryColor: ['#8f91c7', '#494b7c'],
  textColor: ['#161625', '#FFF'],
  inverseTextColor: ['#FFF', '#161625'],
  hintTextColor: ['#494b7c80', '#8f91c7b3'],
  accentColor: ['#735bf2', '#735bf2'],
  errorColor: ['#F66', '#F66'],
  backgroundColor: ['#FFF', '#161625'],
  dividerColor: ['#CCC', '#363645'],
  uncheckedColor: ['#ff6666bb', '#ff6666bb'],
  checkedColor: ['#66ff66bb', '#66ff66bb'],
  formBackgroundColor: ['#FFF', '#363645'],
  blackColor: ['#000', '#000'],
  whiteColor: ['#FFF', '#FFF'],
};

export default function (isDarkTheme: boolean, color: string) {
  // @ts-ignore
  return colors[color][Number(isDarkTheme)];
}
