import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    roles: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }] // массив ссылок
});

export const UserModel = model<IUser>('User', UserSchema);
