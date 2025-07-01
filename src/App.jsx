import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './commonComponents/Navbar';
import ClinicDashboard from './Dashboard/ClinicDashboard';
import ProtectedRoute from './route/ProtectedRoute';
import { isAuthenticated } from './route/auth';
import { Navigate } from 'react-router-dom';
import SuperAdmin from './Dashboard/SuperAdmin';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated() ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                {/* <ClinicDashboard /> */}
                <SuperAdmin />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
