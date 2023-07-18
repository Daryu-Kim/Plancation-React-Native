import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance, ColorSchemeName} from 'react-native';

const initialState: ColorSchemeName = Appearance.getColorScheme() || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ColorSchemeName>) =>
      action.payload || 'light',
  },
});

const {actions, reducer} = themeSlice;
export const {setTheme} = actions;
export default reducer;
