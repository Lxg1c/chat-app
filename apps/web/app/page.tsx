import Image from "next/image";

export default function Home() {
    return (
        <div className="app flex h-screen">
            <div className="chat__list flex-1 bg-gray-500">
                <ul>
                    <li className="flex bg-blue-500 w-full p-2 cursor-pointer">
                        <Image
                            className='rounded-full'
                            src="https://avatars.mds.yandex.net/i?id=0ace0a1c41a6ff6e0cb81483cc9cb060085c6cb9-4404146-images-thumbs&n=13"
                            alt="avatar"
                            width={50}
                            height={50}
                        />
                        <div className="ml-2">
                            <h2>username</h2>
                            <p>last message</p>
                        </div>
                    </li>
                    <li className="flex bg-blue-500 w-full p-2">
                        <Image src="/chat/chat.png" alt="avatar" width={50} height={50} />
                        <div className="ml-2">
                            <h2>username</h2>
                            <p>last message</p>
                        </div>
                    </li>
                    <li className="flex bg-blue-500 w-full p-2">
                        <Image src="/chat/chat.png" alt="avatar" width={50} height={50} />
                        <div className="ml-2">
                            <h2>username</h2>
                            <p>last message</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="chat__content flex-[2] flex flex-col justify-between">
                <div className="chat__messages">1</div>
                <div>
                    <input
                        className="w-full py-2 px-4 text-white rounded-full border border-white bg-transparent"
                        placeholder="Сообщение"
                    />
                </div>
            </div>
        </div>
    );
}
