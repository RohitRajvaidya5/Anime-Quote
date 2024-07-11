import "./App.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  const [quote, setQuote] = useState("Just Do It");
  const [character, setCharacter] = useState("Character");
  const [anime, setAnime] = useState("Anime");
  const [randomNumber, setRandomNumber] = useState(null);
  const [inProp, setInProp] = useState(false);

  const bgUrlRef = useRef(null);
  const xUrlRef = useRef(`https://twitter.com/intent/tweet?text=${quote}&hashtags=[hashtags]`);
  const linkedinUrlRef = useRef(`https://www.linkedin.com/sharing/share-offsite/?url={https://anime-quote-two.vercel.app/}`);

  // Fetching Data From Anime-Quotes.json 
  const fetchQuote = (number) => {
    fetch("/data/Anime-Quotes.json")
      .then((response) => response.json())
      .then((data) => {
        if (data[number]) {
          const randomQuote = data[number];
          setQuote(randomQuote.quote);
          setCharacter(randomQuote.character);
          setAnime(randomQuote.anime);
          setInProp(false);  // Start exit transition
          setTimeout(() => setInProp(true), 100); // Start enter transition
        } else {
          console.error("No quote found at index:", number);
        }
      })
      .catch((error) => console.error("Error fetching the JSON:", error));
  };

  const randomQuote = () => {
    const number = Math.floor(Math.random() * 45);
    setRandomNumber(number);
  };

  useEffect(() => {
    xUrlRef.current.href = `https://twitter.com/intent/tweet?text=This quote is shared from "AnimeQuote Oasis"%0a${quote}%0a-${character} %0aVisit Now on https://animequote-oasis.vercel.app/ %0a&hashtags=animequotes`;
  });

  useEffect(() => {
    linkedinUrlRef.current.href = `https://www.linkedin.com/shareArticle?mini=false&url=https://animequote-oasis.vercel.app//&title="This is an awesome website for anime quotes"&summary=Check out this great resource for all your anime quote needs!`;
  });

  useEffect(() => {
    if (randomNumber !== null) {
      fetchQuote(randomNumber);
    } else {
      const initialNumber = Math.floor(Math.random() * 45);
      setRandomNumber(initialNumber);
      setInProp(true);
    }
  }, [randomNumber]);

  return (
    
    <div className="main-container custom-class @apply text-[white] text-center overflow-hidden relative m-0 before:content-[''] before:absolute before:w-full before:h-full before:bg-[url('/assets/jiraya.png')] before:bg-cover before:bg-center before:z-[-2] before:grayscale-[80%] before:left-0 before:top-0 after:content-[''] after:absolute after:w-full after:h-full after:mix-blend-multiply after:opacity-70 after:z-[-1] after:left-0 after:top-0; h-[94vh] md:h-full font-family: Arial, sans-serif;">
      <div className="first-section w-full text-white h-[8vh] md:h-[15vh] p-2 flex justify-between items-center relative">
        <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center gap-2 relative z-10">
          <img
            src="/assets/logo.jpg"
            className="w-[10vw] md:w-[4vw] rounded-full"
            alt="Logo"
          />
          <div className="bangers-regular logo font-medium text-2xl md:text-3xl">
            AnimeQuote Oasis
          </div>
        </div>

        <div className="flex gap-5 mr-5 items-center relative z-10">
          <div className="p-2"></div>
          <a
            className="px-2 py-2 cursor-pointer border border-gray-500 rounded-xl hover:bg-black hover:text-black"
            ref={xUrlRef}
            target="blank"
          >
            <img src="/assets/x-white.png" className="w-4" alt="x-logo" />
          </a>
          
          <a
            ref={linkedinUrlRef}
            target="blank"
            className="p-2 border border-gray-500 rounded-xl hover:bg-blue-800 hover:text-black"
          >
            <img
              src="/assets/linkedin-white.png"
              alt="linkedin-logo"
              className="w-4"
            />
          </a>
          
        </div>
      </div>

      <div className="middle-section w-full h-[75vh] flex flex-col justify-center items-center">
        <div className="">
          <div className="flex flex-col w-full h-[50vh] justify-center items-center">
            <CSSTransition in={inProp} timeout={1000} classNames="quote-fade" unmountOnExit>
              <div className="text-2xl md:text-3xl font-sans font-bold text-center px-10">
                {quote}
              </div>
            </CSSTransition>
          </div>
          <div className="">
            <div className="">
            <CSSTransition in={inProp} timeout={500} classNames="quote-fade" unmountOnExit>
              <span className="">
                {character}
              </span>
            </CSSTransition>
            </div>
            <div className="self-end md:self-center text-base">
              <span className="font-bold">Anime :</span><span className="text-lg">{anime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="third-section text-sm relative flex md:flex-row justify-between items-center p-5 h-auto md:h-[10vh] md:flex md:gap-5 md:text-lg">
        <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div className="flex gap-5 mb-3 md:mb-0 z-10 md:gap-5 items-center justify-between">
          <button
          className="p-2 md:px-3 border border-gray-500 rounded-xl hover:bg-white hover:text-black md:text-sm text-sm"
          >Settings</button>
          {/* New Quote Button Which Gives Random Quote on Click  */}
          <button
            onClick={randomQuote}
            className="p-2 md:px-3 border border-gray-500 rounded-xl hover:bg-white hover:text-black md:text-sm text-xs"
          >
            New Quote
          </button>
          <div>
            <Popup 
            trigger=
                {<button className="bg-white h-7 w-7 text-black font-bold text-xl font-mono rounded-2xl hover:bg-blue-400">i</button>}
                position="top center">
                
                <button className=" flex justify-center text-center text-white items-center gap-2 w-10vw">
                  <span><img src="/assets/github-white.png" className="w-5" alt="" /></span>
                  <a className="text-black" href="https://github.com/RohitRajvaidya5/Anime-Quote">Github</a>
                </button>
            </Popup>
        </div>
        </div>
        <button className="relative z-10 px-3 text-gray-200 hover:text-white">Suggest a quote?</button>
      </div>
    </div>
  );
}

export default App;
