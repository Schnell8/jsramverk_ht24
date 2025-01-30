/* global describe, it, before, after */
/*
process.env.NODE_ENV = 'test';

import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import server from "../app.mjs";
import mongodb from "../db/mongodb.mjs";
import docManager from "../models/docManager.mjs";

const chai = chaiModule.use(chaiHttp);

chai.should();

describe('Test', () => {
    let db;
    let doc1Id;
    let doc2Id;

    before(async () => {
        db = await mongodb.getDb();

        const doc1 = { title: 'Test title 1', content: 'Test content 1.' };
        const doc2 = { title: 'Test title 2', content: 'Test content 2.' };

        const doc1Result = await docManager.createDocument(doc1);
        const doc2Result = await docManager.createDocument(doc2);

        doc1Id = doc1Result.insertedId;
        doc2Id = doc2Result.insertedId;
    });

    after(async () => {
        await db.collection.deleteMany({});
        await db.client.close();
    });

    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request.execute(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('should get landing page holding info for available routes', (done) => {
            chai.request.execute(server)
                .get("/")
                .end((err, res) => {
                    res.body.should.have.property('routes').that.is.an('array');
                    res.body.routes.length.should.equal(5);
                    done();
                });
        });
    });

    describe('GET /documents', () => {
        it('should get all documents and return 200', (done) => {
            chai.request.execute(server)
                .get("/documents")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data').that.is.an('array');
                    res.body.data.length.should.equal(2);
                    res.body.data[0].should.have.property('title').eql('Test title 1');
                    res.body.data[0].should.have.property('content').eql('Test content 1.');
                    res.body.data[1].should.have.property('title').eql('Test title 2');
                    res.body.data[1].should.have.property('content').eql('Test content 2.');
                    done();
                });
        });
    });

    describe('GET /documents/:id', () => {
        it('should get document by id and return 200', (done) => {
            chai.request.execute(server)
                .get(`/documents/${doc1Id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('title').eql('Test title 1');
                    res.body.data.should.have.property('content').eql('Test content 1.');
                    done();
                });
        });

        it('should return error to get with invalid id', (done) => {
            const invalidId = "InvalidId";

            chai.request.execute(server)
                .get(`/documents/${invalidId}`)
                .end((err, res) => {
                    res.body.should.have.property('error').eql('Failed to get document by ID');
                    done();
                });
        });
    });

    describe('POST /documents/create', () => {
        it('should create document and return 200', (done) => {
            const newDocument = {
                title: 'Test create document',
                content: 'Test to create document.'
            };

            chai.request.execute(server)
                .post("/documents/create")
                .send(newDocument)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('insertedId');
                    res.body.data.should.have.property('acknowledged').eql(true);
                    done();
                });
        });

        it('should return error to create with no title', (done) => {
            const newDocument = { content: 'Content without title.' };

            chai.request.execute(server)
                .post("/documents/create")
                .send(newDocument)
                .end((err, res) => {
                    res.body.should.have.property('error').eql('Failed to create document');
                    done();
                });
        });

        it('should return error to create with no content', (done) => {
            const newDocument = { title: 'Title without content.' };

            chai.request.execute(server)
                .post("/documents/create")
                .send(newDocument)
                .end((err, res) => {
                    res.body.should.have.property('error').eql('Failed to create document');
                    done();
                });
        });
    });

    describe('PUT /documents/:id', () => {
        it('should update document and return 200', (done) => {
            const updatedDocument = { title: 'Updated title', content: 'Updated content.' };

            chai.request.execute(server)
                .put(`/documents/${doc1Id}`)
                .send(updatedDocument)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('acknowledged').eql(true);
                    res.body.data.should.have.property('modifiedCount').eql(1);
                    done();
                });
        });

        it('should return error to update with invalid id', (done) => {
            const updatedDocument = { title: 'New Title', content: 'New Content.' };
            const invalidId = "InvalidId";

            chai.request.execute(server)
                .put(`/documents/${invalidId}`)
                .send(updatedDocument)
                .end((err, res) => {
                    res.body.should.have.property('error').eql('Failed to update document');
                    done();
                });
        });
    });

    describe('DELETE /documents/:id', () => {
        it('should delete document and return 200', (done) => {
            chai.request.execute(server)
                .delete(`/documents/${doc2Id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('acknowledged').eql(true);
                    res.body.data.should.have.property('deletedCount').eql(1);
                    done();
                });
        });

        it('should return error to delete with invalid id', (done) => {
            const invalidId = "InvalidId";

            chai.request.execute(server)
                .delete(`/documents/${invalidId}`)
                .end((err, res) => {
                    res.body.should.have.property('error').eql('Failed to delete document');
                    done();
                });
        });
    });
});
*/
