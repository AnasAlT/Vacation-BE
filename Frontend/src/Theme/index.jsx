import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#39823C' 
    },
    secondary: {
      main: '#fffff',
    },
  },
  typography: {
    fontFamily: [
      'ABCFavoritPro', 
      'sans-serif',
    ].join(','),
    fontSize:12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize:12,
          borderRadius: '20px'
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#EFF3F6',
          
          '&:hover': {
            borderColor: '#676765', 
          },
          'borderColor': '#676765'
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem', 
        },
      },
    },
  },
    
});
 
export default theme;