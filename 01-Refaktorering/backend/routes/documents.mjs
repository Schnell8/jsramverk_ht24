import express from 'express';
import docManager from "../models/docManager.mjs";

const router = express.Router();

router.get('/', async (req, res) => {
    const allDocuments = await docManager.getAllDocuments();

    if (allDocuments === null) {
        return res.json({
            error: 'Failed to get all documents',
        });
    }

    return res.json({
        data: allDocuments,
    });
});

router.get('/:id', async (req, res) => {
    const document = await docManager.getDocumentById(req.params.id);

    if (document === null) {
        return res.json({
            error: 'Failed to get document by ID',
        });
    }

    return res.json({
        data: document
    });
});


router.post("/create", async (req, res) => {
    const newDocument = await docManager.createDocument(req.body);

    if (newDocument === null) {
        return res.json({
            error: 'Failed to create document',
        });
    }

    return res.json({
        data: newDocument
    });
});

router.put('/:id', async (req, res) => {
    const updatedDocument = await docManager.updateDocument(req.params.id, req.body);

    if (updatedDocument === null) {
        return res.json({
            error: 'Failed to update document',
        });
    }

    return res.json({
        data: updatedDocument
    });
});

router.delete('/:id', async (req, res) => {
    const deletedDocument = await docManager.deleteDocument(req.params.id);

    if (deletedDocument === null) {
        return res.json({
            error: 'Failed to delete document',
        });
    }

    return res.json({
        data: deletedDocument
    });
});

export default router;
