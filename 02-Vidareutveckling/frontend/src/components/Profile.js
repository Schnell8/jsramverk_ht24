import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { url } from '../config';
import Loading from './Loading'

// Style
import '../styles/Button.css';
import '../styles/Table.css';

function Profile() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Hämta token från localStorage
                const token = localStorage.getItem('token');

                // GET request till /users/user i backend
                const response = await fetch(`${url}/users/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError(error.message);
                setLoading(false);
            }
        };

    fetchProfile();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    // Radera dokument
    const handleDeleteDocument = async (docId) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this document?`);

        // Hämta token från localStorage
        const token = localStorage.getItem('token');

        if (isConfirmed) {
            try {
                // Delete request till /docs/delete_document i backend
                const response = await fetch(`${url}/docs/delete_document`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ docId }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                // Uppdatera dokumentlistan utan att ladda om sidan
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    docs: prevProfile.docs.filter((doc) => doc.docId !== docId),
                }));

                console.log('Document deleted successfully');
            } catch (error) {
                console.error('Failed to delete document:', error);
                setError(error.message);
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{profile.email}</h1>
            <div className="table-header">
                <h2>Documents</h2>
                <button className="btn green" onClick={() => handleNavigate('/home/add_document')}>Add document</button>
            </div>
            {profile.docs && profile.docs.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Allowed Users</th>
                        <th>Share</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profile.docs.map((doc) => (
                        <tr key={doc.docId}>
                            <td>{doc.title}</td>
                            <td>
                                {doc.allowed_users.map((allowedUser, allowedUserIndex) => (
                                    <div key={allowedUserIndex}>
                                        <span>{allowedUser}</span><br />
                                    </div>
                                ))}
                            </td>
                            <td>
                            <button className="btn blue" onClick={() => handleNavigate(`/home/share_document/${doc.docId}`)}>
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </button>
                            </td>
                            <td>
                            <button className="btn yellow" onClick={() => handleNavigate(`/home/edit_document/${doc.docId}`)}>
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                            </td>
                            <td>
                                <button className="btn red" onClick={() => handleDeleteDocument(doc.docId)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No documents available</p>
            )}
        </div>
    );
}

export default Profile;
