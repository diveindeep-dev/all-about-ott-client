import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/auth/authSlice';
import Index from './pages';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';

function App() {
  const { isAuthenticated } = useSelector((state: State) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate replace to="/" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate replace to="/" /> : <SignIn />}
        />
      </Routes>
    </div>
  );
}

export default App;
