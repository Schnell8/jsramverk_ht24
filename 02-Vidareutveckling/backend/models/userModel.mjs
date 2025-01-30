import mongodb from '../db/mongodb.mjs';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

import 'dotenv/config';

const userModel = {
    // Registrera användare
    registerUser: async (userData) => {
        let db = await mongodb.getDb();
        const userObjectId = new ObjectId().toString();  // Generera ObjectId som vi kan nyttja som userId

        try {
            // Kolla om användaren finns i databasen
            const existingUser = await db.collection.findOne(
                { email: userData.email }
            );
            
            // Finns användare redan returnera att den redan finns
            if (existingUser) {
                return {
                    message: 'User already exists',
                };
            }
            
            // Hasha lösenordet
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            
            // Lägg till ny användare i databas
            const newUser = {
                userId: userObjectId,
                email: userData.email,
                password: hashedPassword,
                docs: [], // Tom dokument array för att utesluta error
            };
            
            // Spara användaren i databasen
            await db.collection.insertOne(newUser);
            
            // Returnera lyckat meddelande, userId och email
            return {
                message: 'User registered successfully',
                userId: newUser.userId,
                email: newUser.email,
            };
        } catch (error) {
            console.error('Error registering user:', error);
            return {
                message: error.message,
            };
        } finally {
            await db.client.close();
        }
    },

    // Hitta användare baserat på email
    findUserByEmail: async (email) => {
        let db = await mongodb.getDb();

        try {
            // Kontrollera om email finns i databasen
            const user = await db.collection.findOne({ email: email });

            // Returnera användare
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            return {
                message: error.message,
            };
        } finally {
            await db.client.close();
        }
    },

    /*
    getUsers: async function () {
        let db = await mongodb.getDb();

        try {
            const users = await db.collection.find().toArray();

            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            return {
                error: true,
                message: error.message
            };
        } finally {
            await db.client.close();
        }
    },

    getUserById: async function(userId) {
        let db = await mongodb.getDb();

        try {
            const user = await db.collection.findOne({ _id: new ObjectId(userId) });

            if (!user) {
                throw new Error('User not found');
            }

            console.log("User found:", user);
            return user;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            return {
                error: true,
                message: error.message
            };
        } finally {
            await db.client.close();
        }
    },

    deleteUser: async function (userId) {
        let db = await mongodb.getDb();

        try {
            const result = await db.collection.deleteOne(
                { userId: userId }
            );

            if (result.modifiedCount === 0) {
                throw new Error('User not deleted');
            }

            return result;
        } catch (error) {
            console.error('Error deleting user:', error);
            return {
                error: true,
                message: error.message
            };
        } finally {
            await db.client.close();
        }
    }
    */
};

export default userModel;
