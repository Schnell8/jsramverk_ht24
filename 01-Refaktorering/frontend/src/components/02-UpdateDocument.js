import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { url } from '../config.js';

import './styles/Form.css';
import './styles/Button.css';

const UpdateDocument = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocumentById = async () => {
            try {
                const response = await fetch(`${url}/documents/${id}`);

                if (!response.ok) {
                    throw new Error('Failed');
                }
                const data = await response.json();

                setTitle(data.data.title);
                setContent(data.data.content);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch document');
            }
        };

    fetchDocumentById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedDocument = { title, content };

        try {
            const response = await fetch(`${url}/documents/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDocument),
            });
            
            if (!response.ok) {
                throw new Error('Failed');
            }

            alert('Document updated successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to update document.');
        }
    };

    return (
        <div>
            <h1>Update Document</h1>
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
                <button className="btn blue" type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateDocument;