import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../config';

// Style
import '../styles/Form.css';
import '../styles/Button.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // POST request till /auth/register i backend
            const response = await fetch(`${url}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Spara token i localStorage
            localStorage.setItem('token', data.token);
            navigate('/home');
        } catch (error) {
            console.error('Failed to register user:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn blue" type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;