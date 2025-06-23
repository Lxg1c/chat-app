import Image from "next/image";

const chats = [
    {
        id: 1,
        avatar: '/Frame 1938.png',
        name: 'Cody Fisher',
        lastMessage: 'Haha oh man',
        time: '05:14pm'
    },
    {
        id: 2,
        avatar: '/Frame 1938.png',
        name: 'Cody Fisher',
        lastMessage: 'Haha oh man',
        time: '05:14pm'
    },
    {
        id: 3,
        avatar: '/Frame 1938.png',
        name: 'Cody Fisher',
        lastMessage: 'Haha oh man',
        time: '05:14pm'
    },
    {
        id: 4,
        avatar: '/Frame 1938.png',
        name: 'Cody Fisher',
        lastMessage: 'Haha oh man',
        time: '05:14pm'
    }
];

const ChatListItem = ({ avatar, name, lastMessage, time }: typeof chats[number]) => (
    <li className="chat-list__item py-3 px-2 flex items-center justify-between gap-4 hover:bg-gray-100 rounded-lg transition">
        <div className="flex items-center gap-4">
            <Image src={avatar} alt={`${name} avatar`} width={50} height={50} className="rounded-full" />
            <div className="flex flex-col">
                <h2 className="text-sm font-medium">{name}</h2>
                <p className="text-xs text-gray-500">{lastMessage}</p>
            </div>
        </div>
        <span className="text-xs text-gray-400">{time}</span>
    </li>
);

const ChatList = () => (
    <section className="chat-list space-y-6">
        <div className="chat-list__search relative mb-4">
            <Image
                src="/search2.svg"
                alt="Search"
                width={18}
                height={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
                className="bg-white border border-[#D1E4E8] pl-10 pr-4 py-2 w-full rounded-full text-sm placeholder:text-gray-400 focus:outline-none"
                placeholder="Search or start a new chat"
            />
        </div>

        <ul className="chat-list__items space-y-2">
            {chats.map((chat) => (
                <ChatListItem key={chat.id} {...chat} />
            ))}
        </ul>
    </section>
);

export default ChatList;
