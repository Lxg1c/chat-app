import { Schema, model, Types } from 'mongoose';

const ChatSchema = new Schema({
    participants: [{
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    lastMessage: {
        type: Types.ObjectId,
        ref: 'Message',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const ChatModel = model('Chat', ChatSchema);
