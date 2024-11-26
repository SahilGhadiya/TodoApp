import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "", role: "admin" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.role === "user") {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('role', 'user');
                localStorage.setItem('token', json.authToken);
                navigate('/');
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
                toast.error("Invalid Details!", {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        else {
            console.log('admin');
            if (credentials.email === "admin@gmail.com" && credentials.password === "admin") {
                localStorage.setItem('role', 'admin');
                localStorage.setItem('token', 'admin');
                navigate('/');
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
                toast.error("Invalid Details!", {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const handleChange = (e) => {
        setcredentials({ ...credentials, role: e.target.value });
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-5">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Role</label>
                        <select
                            className="form-select"
                            id="role"
                            value={credentials.role}
                            onChange={handleChange}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            value={credentials.email}
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
                            value={credentials.password}
                            onChange={onChange}
                            minLength={5}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Log In</button>
                </form>
                <p className="text-center mt-3">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};