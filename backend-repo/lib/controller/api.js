"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = exports.fetchUserData = exports.updateUserData = void 0;
const userRepo = __importStar(require("../repository/userCollection"));
const updateUserData = async (req, res) => {
    var _a;
    try {
        const userId = req.params.userId || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid);
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const userData = req.body;
        // Validasi data masukan
        if (Object.keys(userData).length === 0) {
            res.status(400).json({ error: 'No data provided for update' });
            return;
        }
        // Cek apakah pengguna ada
        const existingUser = await userRepo.getUserById(userId);
        if (!existingUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Perbarui data pengguna
        const updatedUser = await userRepo.updateUser(userId, userData);
        res.status(200).json({
            message: 'User data updated successfully',
            user: updatedUser
        });
    }
    catch (error) {
        console.error('Error in updateUserData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateUserData = updateUserData;
const fetchUserData = async (req, res) => {
    var _a;
    try {
        const userId = req.params.userId || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid);
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        // Cek apakah pengguna ada
        const user = await userRepo.getUserById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error in fetchUserData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.fetchUserData = fetchUserData;
const fetchAllUsers = async (_req, res) => {
    try {
        const users = await userRepo.getAllUsers();
        res.status(200).json({ users });
    }
    catch (error) {
        console.error('Error in fetchAllUsers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.fetchAllUsers = fetchAllUsers;
