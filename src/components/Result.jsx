import Button from "./Button";
import EmojiImg from "./EmojiImg";

export default function Result({title, hasWon, image, currentWord, onClick}){
    return (
    <div className="flex flex-col justify-center items-center p-4 mb-16">
      <h1 className={`text-4xl font-bold mb-4 mt-4 ${hasWon ? "text-green-600" : "text-red-600"}`}>{title}</h1>
      <EmojiImg img={image} />
      <div className="flex items-center flex-col gap-6 mt-4">
        <p className="text-3xl font-semibold">
          The word was {hasWon ? "indeed" : ""}: <span className={`${hasWon ? "text-green-600" : "text-red-600"} font-bold`}>{currentWord}</span>
        </p>
        <Button onClick={onClick} text={"Restart"} />
      </div>
    </div>
    )
}