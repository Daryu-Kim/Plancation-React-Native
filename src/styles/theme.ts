import {DefaultTheme} from 'styled-components/native';

const dark: DefaultTheme = {
  color: {
    primary: '#8f91c7',
    inverse_primary: '#494b7c',
    text: '#FFF',
    inverse_text: '#161625',
    hint_text: '#8f91c7b3',
    accent: '#735bf2',
    error: '#f66',
    background: '#161625',
    divider: '#363645',
    unchecked: '#ff6666bb',
    checked: '#66ff66bb',
    form_background: '#363645',
    black: '#000',
    white: '#fff',
  },
};

const light: DefaultTheme = {
  ...dark,
  color: {
    primary: '#494b7c',
    inverse_primary: '#8f91c7',
    text: '#161625',
    inverse_text: '#FFF',
    hint_text: '#494b7c80',
    accent: '#735bf2',
    error: '#f66',
    background: '#FFF',
    divider: '#ccc',
    unchecked: '#ff6666bb',
    checked: '#66ff66bb',
    form_background: '#FFF',
    black: '#000',
    white: '#fff',
  },
};

export {dark, light};
