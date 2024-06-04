import React, { useState } from 'react';
import './contact.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });

    // Validate fields on change
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({ ...errors, email: emailRegex.test(value) ? '' : 'Invalid email address' });
    } else {
      setErrors({ ...errors, [name]: value.trim() ? '' : `${name} is required` });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: value.trim() ? '' : `${name} is required` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  
  return (
    <div className="contact-container">
      <h2>CONTACT</h2>
      <form onSubmit={handleSubmit}>
        <p>LET'S CONNECT!</p>
        <div className="form-group-1 w-25">
          {/*<label htmlFor="name">Name</label>*/}
          <input
            className= "form-control form-control-lg"
            type="text"
            id="name"
            name="name"
            placeholder="NAME:"
            value={formState.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group-2 w-25">
          {/*<label htmlFor="email">Email</label>*/}
          <input
            className="form-control form-control-lg"
            type="email"
            id="email"
            name="email"
            placeholder="EMAIL:"
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group-3 w-25">
          {/* <label htmlFor="message">Message</label> */}
          <textarea
            className="form-control form-control-lg"
            id="message"
            name="message"
            placeholder="MESSAGE:"
            value={formState.message}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
