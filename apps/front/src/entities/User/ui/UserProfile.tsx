import Image from 'next/image'

const UserProfile = () => (
    <section className="user-profile flex justify-between items-center mb-6">
        <Image src='/avatar.png' alt="avatar" width={40} height={40}/>
        <Image src='/Arrow - Down 2.svg' alt="options" width={24} height={24}/>
    </section>
);

export default UserProfile;
