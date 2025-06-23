interface Input {
    placeholder: string;
    className?: string;
}

const Input = (
    {
        placeholder,
        className = "",
    }: Input
) => {
    return (
        <input
            className={`bg-white rounded-full w-full font-normal text-[14px] px-6 py-3 ${className}`}
            placeholder={placeholder}
        />
    )
}

export default Input