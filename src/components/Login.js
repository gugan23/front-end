import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner, Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://back-end-ztbf.onrender.com/login', formData);
      setToken(response.data.access_token);
      toast.success('Login successful');
      navigate('/assign-task'); // Navigate to the task assigner page
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
