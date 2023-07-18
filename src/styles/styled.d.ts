import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    color: {
      primary: string;
      inverse_primary: string;
      text: string;
      inverse_text: string;
      hint_text: string;
      accent: string;
      error: string;
      background: string;
      divider: string;
      unchecked: string;
      checked: string;
      form_background: string;
      black: string;
      white: string;
    };
  }
}
