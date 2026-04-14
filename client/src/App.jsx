//import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import API from './services/api';
import LoginClone from './pages/LoginClone';
import Awareness from './pages/Awareness';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  // useEffect(() => {
  //   API.get('/')
  //     .then(res => console.log(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login-clone" element={<LoginClone />} />
        <Route path="/awareness" element={<Awareness />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;