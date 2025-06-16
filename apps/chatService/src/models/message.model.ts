import mongoose, { Schema, Types } from 'mongoose';

const MessageSchema = new Schema({
    chatId: { type: Types.ObjectId, ref: 'Chat', required: true },
    senderId: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    attachments: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export const MessageModel = mongoose.model('Message', MessageSchema);
