import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [quote, setQuote] = useState("Just Do It");
  const [character, setCharacter] = useState("Character");
  const [anime, setAnime] = useState("Anime");
  const [randomNumber, setRandomNumber] = useState(null);
  const [url , seturl] = useState("")

  const fetchQuote = (number) => {
    fetch('/Anime-Quotes.json')
      .then(response => response.json())
      .then(data => {
        if (data[number]) {
          const randomQuote = data[number];
          setQuote(randomQuote.quote);
          setCharacter(randomQuote.character);
          setAnime(randomQuote.anime);
        } else {
          console.error('No quote found at index:', number);
        }
      })
      .catch(error => console.error('Error fetching the JSON:', error));
  };

  const randomQuote = () => {
    const number = Math.floor(Math.random() * 45);
    setRandomNumber(number);
  };

  useEffect(() => {
    if (randomNumber !== null) {
      fetchQuote(randomNumber);
    } else {
      const initialNumber = Math.floor(Math.random() * 45);
      setRandomNumber(initialNumber);
    }
  }, [randomNumber]);

  return (
    <>
      <div className="first-section w-full text-gray-100 h-[15vh] p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="./src/assets/logo.jpg"
            className="w-[3vw] md:w-12 rounded-full"
            alt="Logo"
          />
          <div className="logo font-medium text-xl">Anime Quote</div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="p-2">Share On:</div>
          <a className="px-2 py-2 cursor-pointer border border-gray-500 rounded-xl hover:bg-white hover:text-black" href="https://twitter.com/intent/tweet?text=[text to share]&hashtags=[hashtags]" target="blank">Twitter</a>
          <button className="p-2 border border-gray-500 rounded-xl hover:bg-white hover:text-black">Facebook</button>
          <button className="p-2 border border-gray-500 rounded-xl hover:bg-white hover:text-black">Dark Mode</button>
        </div>
      </div>

      <div className="middle-section w-full h-[75vh] flex flex-col justify-center items-center">
        <div className="h-[70vh] w-[90vw] md:w-[80vw]">
          <div className="flex flex-col w-full h-[50vh] rounded-2xl justify-center items-center">
            <div className="text-2xl md:text-3xl font-sans font-bold text-center px-2">{quote}</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full h-[10vh] px-4 md:px-20">
            <div className="self-end md:self-center text-base">
              Character: <span className=" text-lg">{character}</span>
            </div>
            <div className="self-end md:self-center text-base">
              Anime: <span className="text-lg">{anime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="third-section flex flex-col md:flex-row justify-between items-center p-5 h-auto md:h-[10vh]">
        <div className="flex gap-5 mb-3 md:mb-0">
          <div>Settings</div>
          <button>i Button</button>
          <button onClick={randomQuote} className="px-3 border border-gray-500 rounded-xl hover:bg-white hover:text-black">New Quote</button>
        </div>
        <div>Want to suggest a quote?</div>
      </div>
    </>
  );
}

export default App;
