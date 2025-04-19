export default function Button({ text, onClick }) {
    return (
        <button
            className="w-40 h-16 m-1 flex items-center justify-center rounded-xl shadow-md border text-3xl font-semibold transition duration-300 text-black border-4 border-black bg-[#FFD15B] hover:bg-[#ffb95b]"
            onClick={onClick}
        >
        {text}    
        </button>
    );
}