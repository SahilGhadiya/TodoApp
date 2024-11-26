import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/login');
      toast.success("Logged In Successfully!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("User already exists!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              name="cPassword"
              className="form-control"
              id="cPassword"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>
        <p className="text-center mt-3">Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};
