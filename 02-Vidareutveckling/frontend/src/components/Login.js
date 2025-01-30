import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../config.js';

// Style
import '../styles/Form.css';
import '../styles/Button.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Rensa tidigare felmeddelanden

        try {
            // post request till /auth/login i backend
            const response = await fetch(`${url}/users/login`, {
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
            console.error('Failed to login user:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
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
                <button className="btn green" type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;