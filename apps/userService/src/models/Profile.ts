import { Schema, model, Document } from 'mongoose';

export interface IProfile extends Document {
    _id: string;
    username: string;
    phone: string;
    avatar: string;
}

const ProfileSchema = new Schema<IProfile>({
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    avatar: { type: String },
});

export const ProfileModel = model<IProfile>('Profile', ProfileSchema);
