const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.mds.yandex.net',
            },
            {
                protocol: 'https',
                hostname: 'yandex.ru',
            },
            {
                protocol: 'https',
                hostname: 'stihi.ru',
            },
        ],
    },
};

export default nextConfig;