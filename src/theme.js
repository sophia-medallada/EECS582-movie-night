import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#2ba3ff',
      },
      secondary: {
        main: '#ff4081',
      },
    },
  });
