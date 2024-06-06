import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import Footer from '../components/Footer';
import './signup.css';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container d-flex flex-column align-items-left">
      <h2>SIGNUP</h2>
      <div className="container d-flex flex-column align-items-center">
      <form onSubmit={handleFormSubmit}>
        <div className="fmb-3 w-50">
          {/*<label htmlFor="firstName">First Name:</label>*/}
          <input
            className="form-control form-control-lg"
            placeholder="FIRST NAME:"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="fmb-3 w-50">
          {/*<label htmlFor="lastName">Last Name:</label>*/}
          <input
            className="form-control form-control-lg"
            placeholder="LAST NAME:"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="fmb-3 w-50">
          {/*<label htmlFor="email">Email:</label>*/}
          <input
            className="form-control form-control-lg"
            placeholder="EMAIL:"
            name="email"
            type="email"
            id="email2"
            onChange={handleChange}
          />
        </div>
        <div className="fmb-3 w-50">
          {/*<label htmlFor="pwd">Password:</label>*/}
          <input
            className="form-control form-control-lg"
            placeholder="PASSWORD:"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      <Footer />
      </div>
      </div>
  );
}

export default Signup;
