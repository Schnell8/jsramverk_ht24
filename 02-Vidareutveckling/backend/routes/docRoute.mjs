import express from 'express';
import checkToken from '../middleware/checkToken.mjs';
import docModel from "../models/docModel.mjs";
import 'dotenv/config';

const router = express.Router();

// Hämta dokument route
router.get('/:docId', checkToken, async (req, res) => {
    const userId = req.user.userId;
    const docId = req.params.docId;
    const userEmail = req.user.email;

    try {
        // Kalla på getDocumentById i docModel
        const result = await docModel.getDocumentById(userId, docId);

        // Kontrollera om det lyckades
        if (!result.doc) {
            return res.status(404).json({
                message: result.message,
            });
        }

        // Kontrollera om användarens email finns i allowed_users
        const allowedUsers = result.doc.allowed_users;

        if (!allowedUsers.includes(userEmail)) {
            return res.status(403).json({
                message: 'Access denied: You do not have permission to view this document',
            });
        }

        // Returnera lyckat meddelande och dokumentet
        return res.status(200).json({
            message: result.message,
            doc: result.doc,
        });
    } catch (error) {
        console.error('Error in backend route /docs/:docId route:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

// Lägg till dokument route
router.post('/add_document', checkToken, async (req, res) => {
    const userId = req.user.userId;
    const userEmail = req.user.email;
    const { title, content } = req.body;

    try {
        // Validera inkommande data
        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required',
            });
        }

        // Kalla på addDocument i docModel
        const result = await docModel.addDocument(userId, userEmail, {title, content});

        // Kontrollera om det lyckades
        if (result.message !== 'Document added successfully') {
            return res.status(500).json({
                message: result.message,
            });
        }

        // Returnera lyckat meddelande
        return res.status(201).json({
            message: result.message,
        });
    } catch (error) {
        console.error('Error in backend route /docs/add_document:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

// Dela dokument route
router.post('/share_document', checkToken, async (req, res) => {
    const { email, docId, baseUrl } = req.body;

    try {
        // Validera inkommande data
        if (!email || !docId || !baseUrl) {
            return res.status(400).json({
                message: 'email, docId, and baseUrl are required',
            });
        }

        // Kalla på shareDocument i docModel
        const result = await docModel.shareDocument(email, docId, baseUrl);

        // Kontrollera om det lyckades
        if (result.message !== 'Document shared successfully') {
            return res.status(404).json({
                message: result.message,
            });
        }

        // Returnera lyckat meddelande
        return res.status(200).json({
            message: result.message,
            linkToSharedDoc: result.linkToSharedDoc,
        });
    } catch (error) {
        console.error('Error in backend route /docs/share_document route:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

// Uppdatera dokument route
router.put('/update_document', checkToken, async (req, res) => {
    const { docId, title, content, comments } = req.body;

    try {
        // Validera inkommande data
        if (!docId || !title || !content) {
            return res.status(400).json({
                message: 'docId, title, and content are required',
            });
        }

        // Kalla på updateDocument i docModel
        const result = await docModel.updateDocument(docId, title, content, comments);

        // Kontrollera om det lyckades
        if (result.message !== 'Document updated successfully' && result.message !== 'No changes made to document') {
            return res.status(404).json({
                message: result.message,
            });
        }

        // Returnera lyckat meddelande
        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        console.error('Error in backend route /docs/update_document route:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

// Radera dokument route
router.delete('/delete_document', checkToken, async (req, res) => {
    const userId = req.user.userId;
    const docId = req.body.docId;

    try {
        // Validera inkommande data
        if (!docId) {
            return res.status(400).json({
                message: 'docId is required',
            });
        }

        // Kalla på deleteDocument i docModel
        const result = await docModel.deleteDocument(userId, docId);

        // Kontrollera om det lyckades
        if (result.message !== 'Document deleted successfully') {
            return res.status(404).json({
                message: result.message,
            });
        }

        // Returnera lyckat meddelande
        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        console.error('Error in backend route /docs/delete_document:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

export default router;
