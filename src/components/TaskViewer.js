import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner, ListGroup, Button } from 'react-bootstrap';

const TaskViewer = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://back-end-ztbf.onrender.com/task', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data) {
          setTasks(response.data);
        } else {
          toast.error('No tasks found');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleCompleteTask = async (taskId, isCompleted) => {
    try {
      const response = await axios.put(`https://back-end-ztbf.onrender.com/task/${taskId}`, { is_completed: isCompleted }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data) {
        toast.success(response.data.message);
        setTasks(tasks.map(task => task._id === taskId ? { ...task, is_completed: isCompleted } : task));
      } else {
        toast.error('Task update failed');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`https://back-end-ztbf.onrender.com/task/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data) {
        toast.success(response.data.message);
        setTasks(tasks.filter(task => task._id !== taskId));
      } else {
        toast.error('Task deletion failed');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container" style={{ marginTop: '80px', paddingBottom: '2rem' }}>
      <h2 className="mb-4">Tasks Assigned to You</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <ListGroup>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <ListGroup.Item 
                key={task._id}
                className="mb-3"
              >
                <div className="mb-2">
                  <strong>Task:</strong> {task.task_msg}
                </div>
                <div className="mb-2">
                  <strong>Assigned By:</strong> {task.assigned_by_name}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong> {new Date(task.task_date).toLocaleString()}
                </div>
                <div className="mb-3">
                  <strong>Time:</strong> {formatTime(task.task_time)}
                </div>
                <div className="d-flex gap-2">
                  {!task.is_completed && (
                    <Button variant="success" onClick={() => handleCompleteTask(task._id, 1)}>
                      Mark as Complete
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No tasks available</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default TaskViewer;