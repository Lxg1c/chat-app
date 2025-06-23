import Image from 'next/image';

const ChatHeader = () => (
    <header className="chat-header flex items-center justify-between px-6 py-4">
        <div className="recipient flex items-center gap-4">
            <Image src='/userIcon.svg' alt="user avatar" width={48} height={48} />
            <div className="recipient__info">
                <h1 className="recipient__username text-[18px] font-medium">Jane Cooper</h1>
                <p className="recipient__status">online</p>
            </div>
        </div>

        <div className="chat-header__actions flex items-center gap-8">
            <Image src='/calling.svg' alt="call" width={24} height={24} />
            <Image src='/video.svg' alt="video" width={24} height={24} />
            <Image src='/search.svg' alt="search" width={24} height={24} />
            <Image src='/Arrow - Down 2.svg' alt="options" width={24} height={24} />
        </div>
    </header>
);

export default ChatHeader;
