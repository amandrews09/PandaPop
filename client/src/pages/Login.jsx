import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Footer from '../components/Footer';
import './login.css';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
    <h2>LOGIN</h2>
    <div className="container d-flex flex-column align-items-center"></div>
      <form onSubmit={handleFormSubmit}>
        <div className="fmb-3 w-25">
          {/*<label htmlFor="email">Email address:</label>*/}
          <input
            className="form-control form-control-lg"
            placeholder="EMAIL:"
            name="email"
            type="email"
            id="email3"
            onChange={handleChange}
          />
        </div>
        <div className="fmb-3 w-25">
          {/*<label htmlFor="pwd">Password:</label>*/}
          <input
            className="form-control form-control-lg"
            placeholder="PASSWORD:"
            name="password"
            type="password"
            id="pwd2"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
