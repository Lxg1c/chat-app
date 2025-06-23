import UserProfile from '@/entities/User/ui/UserProfile';
import ChatList from '@/features/chat/ChatList';

const ChatSidebar = () => (
    <aside className="sidebar flex-1 py-5 px-6">
        <UserProfile />
        <ChatList />
    </aside>
);

export default ChatSidebar;
