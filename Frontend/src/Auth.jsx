import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegisterBackground from './Components/RegisterBackground/RegisterBackground';

const LogIn = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <RegisterBackground>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="" element={<Navigate to="login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </RegisterBackground>
  );
}

export default Auth;
