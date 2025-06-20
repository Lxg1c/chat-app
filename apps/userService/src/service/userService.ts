import { Types } from "mongoose";
import {ProfileModel} from "../models/Profile";

interface IUserData {
    _id: string;
    username: string;
    phone: string;
}

class UserService {
    async createUser({_id, username, phone}: IUserData) {
        return ProfileModel.create({_id, username, phone })
    }

    async getUsers() {
        return ProfileModel.find()
    }

    async getUserRoles(id: string) {
        return ProfileModel.findById(id).populate("roles", "value");
    }

    async getUserById(id: string) {
        return ProfileModel.findById(id);
    }

    async updateUser(id: string, data: { username?: string; phone?: string }) {
        return ProfileModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
    }

    async updateUserAvatar(id: string, avatar: string) {
        return ProfileModel.findByIdAndUpdate(
            id,
            { $set: { avatar } },
            { new: true }
        );
    }

    async updateUserRoles(id: string, roles: string[]) {
        // преобразуем строки в ObjectId
        const roleIds = roles.map(roleId => new Types.ObjectId(roleId));
        return ProfileModel.findByIdAndUpdate(
            id,
            { $set: { roles: roleIds } },
            { new: true }
        ).populate("roles", "value");
    }

    async deleteUser(id: string) {
        return ProfileModel.deleteOne({ _id: id });
    }
}

export const userService = new UserService();
