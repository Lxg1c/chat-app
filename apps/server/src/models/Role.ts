import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
    value: string;
}

const RoleSchema = new Schema<IRole>({
    value: { type: String, unique: true, required: true } // "USER", "ADMIN", и т.п.
});

export const RoleModel = model<IRole>("Role", RoleSchema);
