import mongodb from "./db/mongodb.mjs";

let timeout;

export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.email || socket.user.docId}`);

        // User joins document room
        socket.on('join-document', (docId) => {
            socket.join(docId);
            console.log(`User ${socket.user.email || socket.user.docId} joined document ${docId}`);
        });

        // User leaves document room
        socket.on('leave-document', (docId) => {
            socket.leave(docId);
            console.log(`User ${socket.user.email || socket.user.docId} left document ${docId}`);
        });

        // Listen for content updates
        socket.on('content', ({ docId, content }) => {
            console.log(`Document ${docId} updated:`, content);
            socket.to(docId).emit('content', content);

            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                let db = await mongodb.getDb();
                try {
                    console.log(`Saving document ${docId}`);
                    await db.collection.updateOne(
                        { "docs.docId": docId },
                        { $set: { "docs.$.content": content } }
                    );
                } catch (error) {
                    console.error(`Failed saving document ${docId}:`, error);
                }
            }, 2000);
        });

        // Listen for new comments
        socket.on('add-comment', async ({ docId, line, comment }) => {
            console.log(`Adding comment to document ${docId} on line ${line}: ${comment}`);
            let db = await mongodb.getDb();
            try {
                const result = await db.collection.updateOne(
                    { "docs.docId": docId },
                    { $push: { [`docs.$.comments.${line}`]: comment } }
                );

                if (result.modifiedCount > 0) {
                    socket.to(docId).emit('new-comment', { line, comment });
                }
            } catch (error) {
                console.error(`Failed saving comment:`, error);
            }
        });

        // Listen for deleted comments
        socket.on('delete-comment', async ({ docId, line, commentIndex }) => {
            console.log(`Deleting comment for document ${docId} on line ${line}, index ${commentIndex}`);
            let db = await mongodb.getDb();
            try {
                await db.collection.updateOne(
                    { "docs.docId": docId },
                    { $unset: { [`docs.$.comments.${line}.${commentIndex}`]: 1 } }
                );

                await db.collection.updateOne(
                    { "docs.docId": docId },
                    { $pull: { [`docs.$.comments.${line}`]: null } }
                );

                const doc = await db.collection.findOne({ "docs.docId": docId }, { projection: { "docs.$": 1 } });
                if (doc?.docs[0]?.comments[line]?.length === 0) {
                    await db.collection.updateOne(
                        { "docs.docId": docId },
                        { $unset: { [`docs.$.comments.${line}`]: "" } }
                    );
                }

                socket.to(docId).emit('delete-comment', { line, commentIndex });
            } catch (error) {
                console.error(`Error deleting comment:`, error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
