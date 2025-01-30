import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from '../config';

// Style
import '../styles/Form.css';
import '../styles/Button.css';
import '../styles/EditDocument.css';

function EditDocument() {
    const { docId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [selectedLine, setSelectedLine] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                // GET request till /docs/:id i backend
                const response = await fetch(`${url}/docs/${docId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setTitle(data.doc.title);
                setContent(data.doc.content);
                setComments(data.doc.comments);
            } catch (error) {
                console.error('Failed to fetch document:', error);
                setError(error.message);
            }
        };

        fetchDocument();
    }, [docId]);

    const handleUpdateDocument = async (e) => {
        e.preventDefault();

        try {
            // PUT request till /docs/update_document i backend
            const response = await fetch(`${url}/docs/update_document`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    docId: docId,
                    title,
                    content,
                    comments,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            navigate('/home');
        } catch (error) {
            console.error('Failed to update document:', error);
            setError(error.message);
        }
    };

    const handleAddComment = () => {
        if (newComment.trim() && selectedLine) {
            setComments((prev) => ({
                ...prev,
                [selectedLine]: [...(prev[selectedLine] || []), newComment],
            }));
            setNewComment('');
        }
    };

    const handleDeleteComment = (line, index) => {
        setComments((prev) => {
            const updatedLineComments = prev[line].filter((_, i) => i !== index);

            // Inga kommentarer kvar, radera line + comment
            if (updatedLineComments.length === 0) {
                const { [line]: _, ...rest } = prev;
                return rest;
            }

            // Annars uppdatera line med kvarliggande kommentarer
            return {
                ...prev,
                [line]: updatedLineComments,
            };
        });
    };

    return (
        <div className="edit-document-container">
            <div className="document-section">
                <form onSubmit={handleUpdateDocument}>
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
                    <button className="btn yellow" type="submit">
                        Update
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className='comments-section'>
                <div className='comments'>
                    <h2>Comments</h2>
                    {Object.keys(comments).length > 0 ? (
                        <>
                            <ul>
                                {Object.entries(comments).map(([line, lineComments]) => (
                                    <li key={line}>
                                        <ul className='ul-inside'>
                                            {lineComments.map((comment, index) => (
                                                <li key={index} className="comment-item">
                                                    <span className="comment-text">
                                                        <strong>Line {line}: </strong>
                                                        {comment}
                                                    </span>
                                                    <button
                                                        className="btn red small"
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteComment(line, index)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No comments made</p>
                    )}
                </div>
                <div className='create-comments'>
                    <h2>Create comment</h2>
                    <label htmlFor="select-line">Select line:</label>
                        <input
                            type="number"
                            id="select-line"
                            value={selectedLine}
                            onChange={(e) => setSelectedLine(e.target.value)}
                            min="1"
                        />
                    <label htmlFor="add-comment">Add comment:</label>
                        <input
                            type="text"
                            id="add-comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    <button
                        className="btn blue small"
                        type="button"
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditDocument;