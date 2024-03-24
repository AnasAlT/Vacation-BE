import TextField from '@mui/material/TextField';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../API/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const handleClick = () => {
    navigate('/signup');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.endsWith('@nortal.com')) {
      setError('Please write an email from @Nortal.com');
      return;
    }

    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Please write correct Email & Password!');
    }

  };

  const handleUserInput = (setter) => (e) => {
    setError('');
    setter(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '20px',
      width: '400px',
      minHeight: '400px',
    }}>
        <div>
        <Typography component="h1" fontSize={24} sx={{ fontWeight: "bold", marginTop: '30px', marginBottom:'20px' }}>
  Log in
        </Typography>
          <form onSubmit={handleSubmit}>
          <Typography>
              Email
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              size='small'
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleUserInput(setEmail)}
              error={Boolean(error)}
              helperText={error}
            />
             <Typography>
              Password
            </Typography>
            <TextField
            size='small'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleUserInput(setPassword)}
              error={Boolean(error)}
              helperText={error}
            />
            <Grid container spacing={2} sx={{ marginTop: '45px'}}>
              <Grid item xs={8} sx={{ 
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Typography fontSize={14}>
                Don’t have an account?
              </Typography>
              <Button
      onClick={handleClick}
      sx={{
        background: 'none', 
        color: '#39823C', 
        textTransform: 'none', 
      }}
    >
      Sign Up
    </Button>
              </Grid>
              <Grid item xs={4}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ textTransform: 'capitalize' }}
              sx={{ backgroundColor: '#39823C', borderRadius: '15px'}}
              >
                Continue
              </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  )
}

export default Login