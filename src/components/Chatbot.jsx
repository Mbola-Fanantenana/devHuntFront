import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/history")
      .then((response) => {
        console.log("Fetched history:", response.data.history);
        setHistory(response.data.history);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleGenerateResponse = async () => {
    try {
      const result = await axios.post("http://localhost:3000/api/generate", {
        prompt,
      });
      setResponse(result.data.response);

      // Mettre à jour l'historique après chaque nouvelle réponse générée
      setHistory((prevHistory) => [
        ...prevHistory,
        { question: prompt, response: result.data.response },
      ]);
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
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>Question:</strong> {item.question} <br />
              <strong>Response:</strong> {item.response}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
