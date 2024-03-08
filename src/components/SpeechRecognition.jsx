import React, { useEffect, useState } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SpeechRecognitionComponent = ({ onResult }) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;

      onResult(transcript);
    };

    if ('webkitSpeechRecognition' in window) {
      if (listening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } else {
      alert("Unfortunately, your browser does not support speech recognition.");
    }

    // Cleanup logic when the component unmounts
    return () => {
      recognition.stop();
    };
  }, [listening, onResult]);

  const handleToggleListening = () => {
    setListening(!listening);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        id="toggleListening"
        checked={listening}
        onChange={handleToggleListening}
        className="sr-only"
      />
      <label htmlFor="toggleListening" className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${listening ? 'bg-[#279E81]' : 'bg-gray-400'}`}>
        <div className={`block h-full w-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${listening ? 'translate-x-full' : ''}`}></div>
      </label>
      <span className={`absolute left-0 ml-3 text-xs ${listening ? 'text-[#323232]' : 'text-[#323232]'}`}>{listening ? 'ON' : 'OFF'}</span>
    </div>

  );
};

export default SpeechRecognitionComponent;
