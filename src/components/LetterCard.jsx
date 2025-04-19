export default function LetterCard({ letter, onClick, disabled }) {
    return (
        <button
            className={`w-14 h-16 m-1 flex items-center justify-center rounded-xl shadow-md border text-3xl font-semibold transition
                        ${disabled ? "bg-gray-200 cursor-not-allowed opacity-50" : "bg-white hover:shadow-lg cursor-pointer"}`}
            onClick={onClick}
            disabled={disabled}
        >
            {letter}
        </button>
    );
}
