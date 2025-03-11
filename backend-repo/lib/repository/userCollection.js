"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = exports.updateUser = exports.getUserById = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const COLLECTION_NAME = 'USERS';
const getUserById = async (userId) => {
    try {
        const userDoc = await firebaseConfig_1.db.collection(COLLECTION_NAME).doc(userId).get();
        if (!userDoc.exists) {
            return null;
        }
        return { id: userDoc.id, ...userDoc.data() };
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};
exports.getUserById = getUserById;
const updateUser = async (userId, userData) => {
    try {
        const now = Date.now();
        const updatedData = {
            ...userData,
            updatedAt: now,
            recentlyActive: now
        };
        await firebaseConfig_1.db.collection(COLLECTION_NAME).doc(userId).update(updatedData);
        const updatedUser = await (0, exports.getUserById)(userId);
        if (!updatedUser) {
            throw new Error('User not found after update');
        }
        return updatedUser;
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
exports.updateUser = updateUser;
const createUser = async (userData) => {
    try {
        const now = Date.now();
        const newUserData = {
            ...userData,
            createdAt: now,
            updatedAt: now,
        };
        const docRef = await firebaseConfig_1.db.collection(COLLECTION_NAME).add(newUserData);
        return {
            id: docRef.id,
            ...newUserData,
        };
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
exports.createUser = createUser;
const getAllUsers = async () => {
    try {
        const usersSnapshot = await firebaseConfig_1.db.collection(COLLECTION_NAME).get();
        return usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
    catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};
exports.getAllUsers = getAllUsers;
