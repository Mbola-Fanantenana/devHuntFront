import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/history")
      .then((response) => setHistory(response.data.history))
      .catch((error) => console.error(error));
  }, []);

  const handleGenerateResponse = async () => {
    try {
      const result = await axios.post("http://localhost:3000/api/generate", {
        prompt,
      });
      setResponse(result.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerateResponse}>Envoyer</button>
      </div>
      <div>
        <p>Response: {response}</p>
      </div>
      <div>
        <h2>History:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
