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
    <div>
      <button onClick={handleToggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default SpeechRecognitionComponent;
