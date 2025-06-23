import Image from 'next/image';
import Input from "@/shared/ui/input/Input";

const ChatInput = () => (
    <div className='flex gap-4 py-3 px-6'>
        <div className='flex gap-4'>
            <button>
                <Image src='/smile.svg' alt='emoji' width={24} height={24} />
            </button>
            <button>
                <Image src='/plus.svg' alt='attachments' width={24} height={24} />
            </button>
        </div>

        <Input placeholder="Say Something" />

        <button>
            <Image src='/voice.svg' alt='voice message' width={18} height={22} />
        </button>
    </div>
);

export default ChatInput;
