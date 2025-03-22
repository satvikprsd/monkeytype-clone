"use client";
import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TypingTest() {
  const [targetText, setTargetText] = useState(
    "Wikis are powered by wiki software, also known as wiki engines. Wikis are powered by wiki software, also known as wiki engines."
  );
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpmData, setWpmData] = useState<{ second: number; wpm: number }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTyping) setIsTyping(true);
      if (event.key.length > 1 && event.key !== "Backspace") return;

      if (event.key === "Backspace") {
        if (currentIndex > 0) {
          setUserInput(userInput.slice(0, -1));
          setCurrentIndex(currentIndex - 1);
        }
        return;
      }

      const currentChar = targetText[currentIndex];
      const isCorrect = event.key === currentChar;

      setUserInput(userInput + event.key);
      setCurrentIndex(currentIndex + 1);

      if (!isCorrect) setErrors((prev) => prev + 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput, currentIndex, targetText]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isTyping) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1;

          // Capture WPM every second
          const wpm = calculateWPM(newTime);
          setWpmData((prevData) => [...prevData, { second: newTime, wpm }]);

          // Stop test after 15 seconds
          if (newTime === 15) {
            clearInterval(timer);
            setIsTyping(false);
            setTimeout(() => setShowResults(true), 1000); // Transition delay
          }

          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTyping]);

  const calculateWPM = (time: number) => {
    const correctChars = currentIndex - errors;
    return time > 0 ? (correctChars / 5) / (time / 60) : 0;
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen transition-opacity duration-700">
      {!showResults ? (
        <div className={`maintype transition-opacity ${isTyping ? "opacity-100" : "opacity-50"}`}>
          <div className="text-2xl font-mono relative inline-block break-words whitespace-pre-wrap w-full leading-loose" ref={containerRef}>
            {targetText.split("").map((char, index) => {
              let className = "inline-block relative text-3xl";

              if (index < userInput.length) {
                className += userInput[index] === char ? " text-green-500" : " text-red-500";
              }

              return (
                <span key={index} className={className}>
                  {index === currentIndex && (
                    <span className={`cursor ${isTyping ? '' : 'blink'}`} />
                  )}
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full text-center animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4">Results</h1>
          <p className="text-xl mb-2">Final WPM: <span className="font-bold">{calculateWPM(15).toFixed(2)}</span></p>
          <div className="w-full h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wpmData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="second" label={{ value: "Time (s)", position: "insideBottomRight" }} />
                <YAxis label={{ value: "WPM", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#82ca9d" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={() => {
              setShowResults(false);
              setUserInput("");
              setCurrentIndex(0);
              setErrors(0);
              setTimeElapsed(0);
              setWpmData([]);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
