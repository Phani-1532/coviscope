import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Analytics from './components/analytics/Analytics';
import Report from './components/reports/Report';

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
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>


  );
}

export default App;
