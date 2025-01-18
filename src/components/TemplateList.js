import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner, ListGroup } from 'react-bootstrap';

const TemplateList = ({ token }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://back-end-ztbf.onrender.com/template', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTemplates(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>Templates</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <ListGroup>
          {templates.map(template => (
            <ListGroup.Item key={template._id}>{template.template_name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default TemplateList;
