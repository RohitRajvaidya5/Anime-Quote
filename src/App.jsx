import "./App.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useState, useEffect, useRef } from "react";

function App() {
  const [quote, setQuote] = useState("Just Do It");
  const [character, setCharacter] = useState("Character");
  const [anime, setAnime] = useState("Anime");
  const [randomNumber, setRandomNumber] = useState(null);

  const bgUrlRef = useRef(null);
  const xUrlRef = useRef(`https://twitter.com/intent/tweet?text=${quote}&hashtags=[hashtags]`);
  const linkedinUrlRef = useRef(`https://www.linkedin.com/shareArticle?mini=true&url=http://google.com&title=${quote}&summary=${quote} - ${character} (${anime})&source=LinkedIn`);

  const fetchQuote = (number) => {
    fetch("/data/Anime-Quotes.json")
      .then((response) => response.json())
      .then((data) => {
        if (data[number]) {
          const randomQuote = data[number];
          setQuote(randomQuote.quote);
          setCharacter(randomQuote.character);
          setAnime(randomQuote.anime);
        } else {
          console.error("No quote found at index:", number);
        }
      })
      .catch((error) => console.error("Error fetching the JSON:", error));
  };

  const randomQuote = () => {
    const number = Math.floor(Math.random() * 45);
    setRandomNumber(number);
    // bgUrlRef.current.style.backgroundImage = "url('/assets/jiraya.png')";
  };

  useEffect(() => {
    xUrlRef.current.href = `https://twitter.com/intent/tweet?text=This quote is shared from "Anime-Quoter"%0a${quote}%0a-${character} %0adownload extension now !!!%0a&hashtags=animequote`;
  });

  useEffect(() => {
    linkedinUrlRef.current.href = `https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title="This is the title"&summary=This is the summary &source=This is the source`;
  });

  useEffect(() => {
    if (randomNumber !== null) {
      fetchQuote(randomNumber);
    } else {
      const initialNumber = Math.floor(Math.random() * 45);
      setRandomNumber(initialNumber);
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
          <div className="bangers-regular logo font-medium text-2xl md:text-4xl">
            Anime Quote
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
            <div className="text-2xl md:text-3xl font-sans font-bold text-center px-10">
              {quote}
            </div>
          </div>
          <div className="">
            <div className="">
            - <span className=" ">{character}</span>
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
                  <a href="https://github.com/RohitRajvaidya5/Anime-Quote">Github</a>
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
