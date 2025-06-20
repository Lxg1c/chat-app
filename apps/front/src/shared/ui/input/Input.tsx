interface Input {
    placeholder: string;
    className: string;
}

const Input = (
    {
        placeholder,
        className = "",
    }: Input
) => {
    return (
        <input
            className={`input w-full px-5 py-2 border-2 border-teal-500 text-white rounded-full ${className}`}
            placeholder={placeholder}
        />
    )
}

export default Input