import { useEffect, useState, useMemo, useCallback} from "react";
import EmojiImg from "./components/EmojiImg";
import words from "./constants/words";
import LetterCard from "./components/LetterCard";
import Result from "./components/Result";
import {images, status} from "./helpers/constants";

function App() {
  const [currentWord, setCurrentWord] = useState(() => {
      const word = words[Math.floor(Math.random() * words.length)];
      return word;
  });

  const [currentEmoji, setCurrentEmoji] = useState(images[0]);
  const letters = useMemo(()=>currentWord.split(""),[currentWord]);

  const [randomizedLetters, setRandomizedLetters] = useState([]);
  const [word, setWord] = useState(() => Array(letters.length).fill("_"));
  const [disabledIndexes, setDisabledIndexes] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameStatus, setGameStatus] = useState(status.PLAYING);

  const initializeGame = useCallback(() => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const newRandomizedLetters = [...newWord.split("")].sort(() => Math.random() - 0.5);
  
    setCurrentWord(newWord);
    setRandomizedLetters(newRandomizedLetters);
    setWord(Array(newWord.length).fill("_"));
    setDisabledIndexes([]);
    setCurrentMove(0);
    setCurrentEmoji(images[0]);
    setGameStatus(status.PLAYING);
  }, []);
  
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);


  const isWordComplete = (wordArray) => {
    return !wordArray.includes("_");
  };
    
  const checkWord = (wordArray) => {
    if (wordArray.join("") === currentWord) {
      setGameStatus(status.WIN);
      setCurrentEmoji(images[0]);
    } else {
      if(currentMove === 2){
        setGameStatus(status.LOSE);
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
    if (gameStatus!== status.PLAYING ) return;

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
      {gameStatus !== status.PLAYING ? (
        <Result
          title={`YOU ${gameStatus}`}
          hasWon={gameStatus === status.WIN}
          image={currentEmoji}
          currentWord={currentWord}
          onClick={initializeGame}
        />
      ) : (
        <div className="flex flex-col justify-center items-center p-4 mb-16">
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
        </div>
      )}
    </div>
  );
  
}

export default App;
