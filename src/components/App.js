import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import TemplateList from './TemplateList';
import TemplateForm from './TemplateForm';
import TaskAssigner from './TaskAssigner';
import TaskViewer from './TaskViewer';
import Navbar from './Navbar';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      {token && <Navbar token={token} setToken={setToken} />}
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/templates" element={token ? <TemplateList token={token} /> : <Navigate to="/login" />} />
          <Route path="/create-template" element={token ? <TemplateForm token={token} /> : <Navigate to="/login" />} />
          <Route path="/assign-task" element={token ? <TaskAssigner token={token} /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={token ? <TaskViewer token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
