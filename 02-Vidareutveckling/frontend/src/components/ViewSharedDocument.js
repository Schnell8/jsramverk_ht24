import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { url } from '../config';

// Style
import '../styles/Button.css';

function ViewSharedDocument() {
    const { docId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [selectedLine, setSelectedLine] = useState('');
    const [error, setError] = useState('');

    const socket = useRef(null)

    useEffect(() => {
        // Initiera WebSocket
        socket.current = io(url, { // Url kan behöva ändras vid driftsättning, åtgärdas i config filen
            auth: { token: localStorage.getItem("token") }
        });
        
        // Gå med i rum för specifikt dokument
        socket.current.emit('join-document', docId);

        const fetchDocument = async () => {
            try {
                // GET request till /docs/:docId i backend
                const response = await fetch(`${url}/docs/${docId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
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

        // Lyssna på live uppdateringar för content
        socket.current.on('content', (data) => {
            setContent(data);
        });

        // Lyssna på live uppdateringar för nya kommentarer
        socket.current.on('new-comment', ({ line, comment }) => {
            setComments((prev) => ({
                ...prev,
                [line]: [...(prev[line] || []), comment],
            }));
        });

        // Lyssna på live uppdatering för att radera kommentar
        socket.current.on('delete-comment', ({ line, commentIndex }) => {
            setComments((prev) => {
                const updatedLineComments = prev[line].filter((_, i) => i !== commentIndex);
        
                if (updatedLineComments.length === 0) {
                    const { [line]: _, ...rest } = prev;
                    return rest;
                }
        
                return {
                    ...prev,
                    [line]: updatedLineComments,
                };
            });
        });

        return () => {
            // Lämna rum och koppla bort
            socket.current.emit('leave-document', docId);
            socket.current.disconnect();
        };
    }, [docId]);

    // Hantera ändringar i content
    const handleContentChange = (e) => {
        const value = e.target.value;
        setContent(value);

        // Emit uppdaterad content till server
        socket.current.emit("content", { docId, content: value });
    };

    // Hantera ny kommentar
    const handleAddComment = () => {
        if (newComment.trim() && selectedLine) {
            // Emit ny kommentar till server
            socket.current.emit('add-comment', {
                docId,
                line: selectedLine,
                comment: newComment,
            });

            setComments((prev) => ({
                ...prev,
                [selectedLine]: [...(prev[selectedLine] || []), newComment],
            }));

            setNewComment('');
        }
    };

    // Hantera radera kommentar
    const handleDeleteComment = (line, index) => {
        // Emit raderad kommentar till server
        socket.current.emit('delete-comment', {
            docId,
            line,
            commentIndex: index,
        });
    
        setComments((prev) => {
            const updatedLineComments = prev[line].filter((_, i) => i !== index);
    
            if (updatedLineComments.length === 0) {
                // Inga kommentarer kvar på raden, radera hela raden
                const { [line]: _, ...rest } = prev;
                return rest;
            }
    
            return {
                ...prev,
                [line]: updatedLineComments,
            };
        });
    };

    // Funktion för att rensa content
    function clear(e) {
        e.preventDefault();
        const value = ""; 
        setContent(value);

        // Emit uppdaterad content till server
        socket.current.emit("content", { docId, content: value });
    }

    return (
        <div className="edit-document-container">
            <div className="document-section">
                <h1>{title}</h1>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                />
                <button
                    className="btn clear" onClick={clear}>
                    Clear
                </button>
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

export default ViewSharedDocument;