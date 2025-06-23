import { AuthGuard } from './AuthGuard';
import ChatSidebar from '@/widgets/ChatSidebar/ChatSidebar';
import ChatWindow from '@/widgets/ChatWindow/ChatWindow';

export default function HomePage() {
    return (
        <AuthGuard>
            <main className="app flex">
                <ChatSidebar />
                <ChatWindow />
            </main>
        </AuthGuard>
    );
}
