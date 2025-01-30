import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../config';

// Style
import '../styles/Form.css';
import '../styles/Button.css';

function ShareDocument() {
    const { docId } = useParams();
    const [email, setEmail] = useState('');
    const [docLink, setDocLink] = useState('');
    const [error, setError] = useState('');

    const handleShare = async (e) => {
        e.preventDefault();

        try {
            // Hämta token från localStorage
            const token = localStorage.getItem('token');

            // POST request till /docs/share_document i backend
            const response = await fetch(`${url}/docs/share_document`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email,
                    docId,
                    baseUrl: window.location.origin
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDocLink(data.linkToSharedDoc);
        } catch (error) {
            console.error('Failed to share document:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleShare}>
                <div>
                    <label htmlFor="email">Email to share document with:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className="btn blue" type="submit">Share</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {docLink && (
                <div>
                    <p>Document has been shared.</p>
                    <a href={docLink} target="_blank" rel="noopener noreferrer" className="styled-link">
                        Click here to access the document
                    </a>
                </div>
            )}
        </div>
    );
}

export default ShareDocument;