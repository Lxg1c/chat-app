import mongoose, { Schema, Types } from 'mongoose';

const ChatSchema = new Schema({
    title: { type: String },
    participants: [{ type: Types.ObjectId, ref: 'User', required: true }],
    isGroup: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const ChatModel = mongoose.model('Chat', ChatSchema);
