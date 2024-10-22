import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../config.js';

import './styles/Form.css';
import './styles/Button.css';

const CreateDocument = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${url}/documents/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            alert('Document created successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to create document');
        }
    };

    return (
        <div>
            <h1>Create Document</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button className="btn green" type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateDocument;