import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../config';

// Style
import '../styles/Form.css';
import '../styles/Button.css';

function AddDocument() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddDocument = async (e) => {
        e.preventDefault();

        try {
            // Hämta token från localStorage
            const token = localStorage.getItem('token');

            // POST request till /docs/add_document i backend
            const response = await fetch(`${url}/docs/add_document`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            navigate('/home');
        } catch (error) {
            console.error('Failed to add document:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleAddDocument}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button className="btn green" type="submit">Add</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AddDocument;
