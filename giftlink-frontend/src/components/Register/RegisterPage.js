import React, { useState } from 'react';
import './RegisterPage.css';

// Task 1: Import urlConfig
import { urlConfig } from '../../config';

// Task 2: Import useAppContext
import { useAppContext } from '../../context/AuthContext';

// Task 3: Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    // State variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4: State for error message
    const [showerr, setShowerr] = useState('');

    // Task 5: Create navigate and setIsLoggedIn
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    // Handle Register
   const handleRegister = async () => {
    try {
        const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });

        // Task 1: Access data from backend response
        const json = await response.json();

        // Task 5: Handle registration failure
        if (!response.ok || json.error) {
            setShowerr(json.error || json.message || "Registration failed");
            return;
        }

        // Task 2: Set user details in session storage
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);
        }

        // Task 3: Set logged-in state
        setIsLoggedIn(true);

        // Task 4: Navigate to main page
        navigate('/app');

    } catch (e) {
        console.log("Error fetching details: " + e.message);
        setShowerr("Something went wrong");
    }
};


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        {showerr && <div className="text-danger text-center mb-2">{showerr}</div>}
  
                        {/* Error Message */}
                        {showerr && (
                            <div className="alert alert-danger text-center">
                                {showerr}
                            </div>
                        )}

                        {/* First Name */}
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Register Button */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
