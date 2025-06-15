import { userService } from "../service/userService";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const {username, avatar, phone, roles} = req.body;

            if (!username || !avatar || !phone || !roles) {
                return res.status(400).json({message: "Invalid data"})
            }

            // const result = await userService.createUser({username, avatar, phone, roles})
            // res.json(result)
        } catch (e) {
            console.error(e);
        }
    }
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.getUsers();
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to get users" });
        }
    }

    async getUserRoles(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return
            }

            const result = await userService.getUserRoles(id);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to get user roles" });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return
            }

            const result = await userService.getUserById(id);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to get user" });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { username, phone } = req.body;

            if (!isValidObjectId(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return
            }

            if (!username && !phone) {
                res.status(400).json({ error: "Nothing to update" });
                return
            }

            const result = await userService.updateUser(id, { username, phone });
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to update user" });
        }
    }

    async updateUserAvatar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { avatar } = req.body;

            if (!isValidObjectId(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return
            }

            if (!avatar) {
                res.status(400).json({ error: "Avatar URL is required" });
                return
            }

            const result = await userService.updateUserAvatar(id, avatar);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to update avatar" });
        }
    }

    async updateUserRoles(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { roles } = req.body;

            if (!isValidObjectId(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return
            }

            if (!Array.isArray(roles) || roles.some(r => !isValidObjectId(r))) {
                res.status(400).json({ error: "Invalid roles array" });
                return
            }

            const result = await userService.updateUserRoles(id, roles);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to update roles" });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!isValidObjectId(id)) {
                res.status(400).json({ error: "Invalid user ID" });
                return
            }

            const result = await userService.deleteUser(id);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to delete user" });
        }
    }
}

export const userController = new UserController();
