import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import url from '../config.js';

import './styles/Table.css';

function AllDocuments() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        async function fetchAllDocuments() {
            try {
                const response = await fetch(`${url}/documents`);
                const data = await response.json();

                if (data.error) {
                    throw new Error('Failed');
                } else {
                    setDocuments(data.data);
                }
            } catch (err) {
                console.error(err);
                alert('Failed to fetch documents');
            }
        }

    fetchAllDocuments();
    }, []);

    // Update document
    const handleUpdateDocument = (id) => {
        window.location.href = `/update/${id}`;
    };

    // Delete document
    const handleDeleteDocument = async (id) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this document?`);

        if (isConfirmed) {
            try {
                const response = await fetch(`${url}/documents/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed');
                }

                window.location.reload();
            } catch (err) {
                console.error(err);
                alert('Failed to delete document');
            }
        }
    };

    return (
        <div>
            <h1>Documents</h1>
            <table>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                    <tr key={doc._id}>
                        <td>{doc.title}</td>
                        <td>
                            <button className="btn blue" onClick={() => handleUpdateDocument(doc._id)}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                        </td>
                        <td>
                            <button className="btn red" onClick={() => handleDeleteDocument(doc._id)}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllDocuments;