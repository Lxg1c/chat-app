import ChatHeader from '@/entities/Chat/ui/ChatHeader';
import ChatMessages from '@/features/chat/ChatMessages';
import ChatInput from '@/features/chat/ChatInput';

const ChatWindow = () => (
    <section className="chat-window flex-2 flex flex-col bg-[#fbe1e2] h-screen">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
    </section>
);

export default ChatWindow;
