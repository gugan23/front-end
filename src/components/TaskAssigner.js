import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner, Button, Form, Card, Dropdown, ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskAssigner = ({ token }) => {
  const [formData, setFormData] = useState({
    assigned_user: '',
    task_date: new Date(),
    task_time: '',
    is_completed: 0,
    task_msg: ''
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://back-end-ztbf.onrender.com/team', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data) {
          setUsers(response.data);
        } else {
          toast.error('No users found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      }
    };

    fetchUsers();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, task_date: date });
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const seconds = hours * 3600 + minutes * 60;
    setFormData({ ...formData, task_time: seconds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://back-end-ztbf.onrender.com/task', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data) {
        toast.success(response.data.message);
      } else {
        toast.error('Task creation failed');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error creating task');
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
              <Card.Title>Assign Task</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAssignedUser">
                  <Form.Label>Assigned User</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Select User
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {users.map(user => (
                        <Dropdown.Item key={user._id} onClick={() => setFormData({ ...formData, assigned_user: user._id })}>
                          {user.first_name} {user.last_name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group controlId="formTaskDate">
                  <Form.Label>Task Date</Form.Label>
                  <DatePicker selected={formData.task_date} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                </Form.Group>
                <Form.Group controlId="formTaskTime">
                  <Form.Label>Task Time</Form.Label>
                  <Form.Control type="time" name="task_time" onChange={handleTimeChange} required />
                </Form.Group>
                <Form.Group controlId="formTaskMsg">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control as="textarea" name="task_msg" onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Assign Task'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskAssigner;
