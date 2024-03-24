import { useState } from 'react';
import {
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Box,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API/login';

// Email error

const SignUpForm = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  const countries = [
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Estonia', label: 'Estonia' },
    { value: 'Finland', label: 'Finland' },
    { value: 'United States', label: 'United States' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Lithuania', label: 'Lithuania' },
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'Oman', label: 'Oman' },
  ];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    countryName: 'Serbia',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    countryName: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First Name should contain only characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last Name should contain only characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@nortal\.com$/.test(formData.email)) {
      newErrors.email = 'Email Address should be at format "@nortal.com"';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
  } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
  }  
  if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    const newErrors = {};
    event.preventDefault();
    if (validateForm()) {
      const { email, password, countryName, firstName, lastName } = formData;
      try {
        const res = await fetch('http://4.223.160.231:8080/api/um/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, countryName, firstName, lastName }),
        });
        const data = await res.json();
        if(data.message){
          if(data.message === "Email already exists"){
            newErrors.email = 'Email already exists';
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0; 
          }
        }
        await loginUser(formData.email, formData.password);
        navigate('/dashboard');
      } catch (error) {
        console.log(error.message || "Something went wrong!")
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '20px',
        width: '400px',
        minHeight: '597px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography component="h1" fontSize={24} sx={{ fontWeight: 'bold', marginBottom: '20px', marginTop: '20px' }}>
          Create an account
        </Typography>
        <Grid container gap={'12px'} >
          <Stack width="100%" direction="row" gap="8px" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography>First Name</Typography>
              <TextField
                size="small"
                id="firstName"
                variant="outlined"
                name="firstName"
                hiddenLabel
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Box>
            <Box>
              <Typography>Last Name</Typography>
              <TextField
                size="small"
                id="lastName"
                variant="outlined"
                name="lastName"
                hiddenLabel
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>
          </Stack>
          <Grid item xs={12}>
            <Typography>Email Address</Typography>
            <TextField
              hiddenLabel
              size="small"
              id="email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Password</Typography>
            <TextField
              hiddenLabel
              size="small"
              id="password"
              variant="outlined"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
             <Grid item xs={12} sx={{ marginTop:'20px'}}>
            <Typography>Confirm Password</Typography>
            <TextField
              hiddenLabel
              size="small"
              id="confirm-password"
              variant="outlined"
              type="password"
              fullWidth
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            </Grid>
            <InputLabel id="demo-simple-select-standard-label" style={{ marginTop: '25px' }}>
              Country
            </InputLabel>
            <Select
              defaultValue="Serbia"
              name='countryName'
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Country"
              fullWidth
              placeholder="Serbia"
              required
              size="small"
              value={formData.countryName}
              onChange={handleChange}
              sx={{ fontSize: '0.8rem' }}
            >
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={0.3} alignItems="center" marginTop={8} marginBottom={5}>
          <Grid item>
            <Typography sx={{ fontWeight: 'light' }}>Already have an account?</Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClick}
              sx={{
                background: 'none',
                color: '#39823C',
                textTransform: 'none',
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item sx={{ marginLeft: 'auto' }}>
            <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }}>
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpForm;
