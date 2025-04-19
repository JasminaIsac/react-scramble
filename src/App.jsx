import { useEffect, useState } from "react";
import EmojiImg from "./components/EmojiImg";
import words from "./constants/words";
import LetterCard from "./components/LetterCard";
import smile from "./assets/smile.png";
import noMouth from "./assets/no-mouth.png";
import sad from "./assets/sad.png";
import Result from "./components/Result";

function App() {
  const [currentWord, setCurrentWord] = useState(() => {
      const word = words[Math.floor(Math.random() * words.length)];
      return word;
  });

  const images = [smile, noMouth, sad];

  const [currentEmoji, setCurrentEmoji] = useState(images[0]);
  const letters = currentWord.split("");

  const [randomizedLetters, setRandomizedLetters] = useState([]);
  const [word, setWord] = useState(() => Array(letters.length).fill("_"));
  const [disabledIndexes, setDisabledIndexes] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const newRandomizedLetters = [...newWord.split("")].sort(() => Math.random() - 0.5);
    
    setCurrentWord(newWord);
    setRandomizedLetters(newRandomizedLetters);
    setWord(Array(newWord.length).fill("_"));
    setDisabledIndexes([]);
    setCurrentMove(0);
    setCurrentEmoji(images[0]);
    setHasWon(false);
    setHasLost(false);
  };
  
  
  const isWordComplete = (wordArray) => {
    return !wordArray.includes("_");
  };
    
  const checkWord = (wordArray) => {
    if (wordArray.join("") === currentWord) {
      setHasWon(true);
      setCurrentEmoji(images[0]);
    } else {
      if(currentMove === 2){
        setHasLost(true);
        setCurrentEmoji(images[2]); 
      } else {
        console.log(currentMove, currentEmoji);
        const newMove = currentMove + 1;
        setCurrentMove(newMove);
        setWord(Array(currentWord.length).fill("_"));
        setDisabledIndexes([]);
        setCurrentEmoji(images[newMove]);
      }
    }
  };
      

  const handleLetterClick = (letter, index) => {
    if (hasWon || hasLost) return;

    const newWord = [...word];
    const emptyIndex = newWord.findIndex((l) => l === "_");
    
    if (emptyIndex !== -1) {
      newWord[emptyIndex] = letter;
      setWord(newWord);
    }

    setDisabledIndexes((prev) => [...prev, index]);

    if (isWordComplete(newWord)) {
        checkWord(newWord);
    }
  }

  return (
    <div>
      {hasWon
        ? <Result title = "YOU WIN" hasWon = {true} image = {currentEmoji} currentWord = {currentWord} onClick = {initializeGame} />
        : hasLost
        ? <Result title = "YOU LOSE" hasWon = {false} image = {currentEmoji} currentWord = {currentWord} onClick = {initializeGame} />
        : <div className="flex flex-col justify-center items-center p-4 mb-16">
        <h1 className="text-4xl font-bold mb-4 mt-4">UNSCRAMBLE THE WORD</h1>
        <EmojiImg img={currentEmoji} />
        <div className="flex mb-4">
          {word.map((letter, index) => (
            <span
              className="w-10 h-20 flex items-center justify-center text-3xl font-semibold"
              key={index}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="flex">
          {randomizedLetters.map((letter, index) => (
            <LetterCard
              key={index}
              letter={letter}
              onClick={() => handleLetterClick(letter, index)}
              disabled={disabledIndexes.includes(index)}
            />
          ))}
        </div>
      </div>}
    </div>
  );
}

export default App;
