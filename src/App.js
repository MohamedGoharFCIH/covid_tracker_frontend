import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './services/UserContext';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectRoute';
import Home from './components/Home';
import Profile from './components/Profile';
import Medicines from './components/Medicines';
import Patients from './components/Patients';

function App() {
  return (
    <BrowserRouter>
     
        <div className="container mt-3">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/medicines' element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
            <Route path='/patients' element={<ProtectedRoute><Patients /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
  
    </BrowserRouter>
  );
}

export default App;
