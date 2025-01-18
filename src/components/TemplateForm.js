import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner, Button, Form, Card } from 'react-bootstrap';

const TemplateForm = ({ token }) => {
  const [formData, setFormData] = useState({
    template_name: '',
    subject: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://back-end-ztbf.onrender.com/template', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
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
              <Card.Title>Create Template</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTemplateName">
                  <Form.Control type="text" name="template_name" placeholder="Template Name" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formSubject">
                  <Form.Control type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formBody">
                  <Form.Control as="textarea" name="body" placeholder="Body" onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Create Template'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;
