import mongodb from '../db/mongodb.mjs';
import { ObjectId } from 'mongodb';
import { sendEmail } from '../service/emailService.mjs';

import 'dotenv/config';

const docModel = {
    // Lägg till document för användare
    addDocument: async (userId, userEmail, docData) => {
        let db = await mongodb.getDb();
        const docObjectId = new ObjectId().toString();

        try {
            // Uppdatera docs datan för användare
            const result = await db.collection.updateOne(
                { userId: userId },
                {
                    $push: {
                        docs: {
                            docId: docObjectId,
                            title: docData.title,
                            content: docData.content,
                            comments: {},
                            allowed_users: [userEmail],
                        },
                    },
                }
            );

            // Kontrollera om dokumentet lades till
            if (result.modifiedCount === 0) {
                return {
                    message: 'Add document failed',
                };
            }

            // Returnera lyckat resultat
            return {
                message: 'Document added successfully',
            };
        } catch (error) {
            console.error('Error adding document:', error);
            return {
                message: error.message,
            };
        } finally {
            await db.client.close();
        }
    },


    // Delete document from user
    deleteDocument: async (userId, docId) => {
        let db = await mongodb.getDb();

        try {
            // Uppdatera användarens dokumentlista
            const result = await db.collection.updateOne(
                { userId: userId },
                { $pull: { docs: { docId: docId } } }
            );

            // Kontrollera om dokumentet raderades
            if (result.modifiedCount === 0) {
                return {
                    message: 'Delete document failed',
                };
            }
    
            // Returnera lyckat resultat
            return {
                message: 'Document deleted successfully',
            };
        } catch (error) {
            console.error('Error deleting document:', error);
            return {
                message: error.message,
            };
        } finally {
            await db.client.close();
        }
    },

    // Hämta dokument baserat på id
    getDocumentById: async (userId, docId) => {
        let db = await mongodb.getDb();

        try {
            // Hitta användaren och dokumentet
            const user = await db.collection.findOne(
                { userId: userId, 'docs.docId': docId },
                { projection: { 'docs.$': 1 } } // Returnera bara matchande dokument
            );

            // Kontrollera om dokumentet finns hos användaren
            if (!user.docs || user.docs.length === 0) {
                return {
                    message: 'Document not found',
                };
            }

            // Returnera lyckat resultat
            return {
                message: 'Document fetched successfully',
                doc: user.docs[0], // Returnera det matchade dokumentet i arrayen
            };
        } catch (error) {
            console.error('Error finding document by ID:', error);
            return {
                message: error.message,
            };
        } finally {
            await db.client.close();
        }
    },

    // Uppdatera dokument
    updateDocument: async (docId, title, content, comments) => {
        let db = await mongodb.getDb();

        try {
            // Uppdatera dokumentet i docs-arrayen
            const result = await db.collection.updateOne(
                { 'docs.docId': docId }, // Matcha dokumentet med docId
                {
                    $set: {
                        'docs.$.title': title,
                        'docs.$.content': content,
                        "docs.$.comments": comments,
                    },
                }
            );

            // Kontrollera om dokumentet hittades
            if (result.matchedCount === 0) {
                return {
                    message: 'Document not found',
                };
            }

            // Kontrollera om dokumentet uppdaterades
            if (result.modifiedCount === 0) {
                return {
                    message: 'No changes made to document',
                };
            }

            // Returnera lyckat resultat
            return {
                message: 'Document updated successfully',
            };
        } catch (error) {
            console.error('Error updating document:', error);
            return {
                message: error.message
            };
        } finally {
            await db.client.close();
        }
    },

    // Dela dokument
    shareDocument: async (email, docId, baseUrl) => {
        let db = await mongodb.getDb();
        const urlForRegister = `${baseUrl}/register`; // länk till registrering
        const urlForSharedDoc = `${baseUrl}/view_shared_document/${docId}`; // länk till delat dokument

        try {
            // Skicka email med ovan länk
            await sendEmail(
                email,
                'Invite to edit document',
                `Register at: ${urlForRegister}\nTo access document click here: ${urlForSharedDoc}`
            );

            // Lägg till email i allowed_users för dokument
            const allowedUserResult = await db.collection.updateOne(
                { "docs.docId": docId },
                { $addToSet: { "docs.$.allowed_users": email } }
            );

            // Kontrollera om allowed_users för dokumentet uppdaterades
            if (allowedUserResult.modifiedCount === 0) {
                return {
                    message: 'Update allowed_users for document failed',
                };
            }

            return {
                message: 'Document shared successfully',
                linkToSharedDoc: urlForSharedDoc
            };
        } catch (error) {
            console.error('Error sharing document:', error);
            return {
                message: error.message
            };
        } finally {
            await db.client.close();
        }
    },
};

export default docModel;