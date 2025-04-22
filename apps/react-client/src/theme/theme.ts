import { type PaletteMode } from '@mui/material/styles/createPalette';
import { LightThemePalette, DarkThemePalette } from './palette';

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    common: {
      black: '#000',
      white: '#fff'
    },
    ...(mode === 'light' ? LightThemePalette : DarkThemePalette)
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 768,
      lg: 1024,
      xl: 1400
    }
  }
});
