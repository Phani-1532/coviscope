import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
    <Router>
      <Routes>
  <Route path="/" element={<Login />} /> {/* or Dashboard if already logged in */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
</Routes>
    </Router>
  </AuthProvider>
    
    
  );
}

export default App;
