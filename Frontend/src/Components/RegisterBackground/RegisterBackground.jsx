import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './RegisterBackground.css';

import backgroundImg from '../../Assets/images/background.svg';

const RegisterBackground = ({ children }) => {
  return (
    <Box sx={{ 
      position: 'absolute',
      flexGrow: 1,
      backgroundImage: `url(${backgroundImg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: '100vh',
      width: '100vw',
    }}>
      <div className="logoContainer">
        <img src="/images/Logo.svg" alt="Nortal Logo" className='NortalLogo' />
      </div>
      <Grid container>
        <Grid item xs={8} sx={{
          position: 'relative',
          backgroundColor: '#0000008F',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {children}
        </Grid>
        <Grid item xs={4} />
      </Grid>
    </Box>
  )
}

export default RegisterBackground;