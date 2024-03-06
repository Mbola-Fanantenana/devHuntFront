import React, {useEffect, useState} from "react";
import axios from "axios";

const Chatbot = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState([]);
    const [history, setHistory] = useState([]);
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/history")
            .then((response) => {
                setHistory(response.data.history);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleGenerateResponse = async () => {
        try {

            setQuestion((prevQuestion)=>
                [...prevQuestion, prompt]);

            const result = await axios.post("http://localhost:3000/api/generate", {
                prompt,
            });

            setResponse(result.data);
            console.log(result.data)
            setPrompt('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={'px-2 py-5'}>
            <div className={'p-2 bg-gradient-to-r from-purple-700 to-blue-800 min-h-screen flex flex-col'}>
                <div className={'flex space-x-2'}>
                    <input
                        type="text"
                        value={prompt}
                        className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        className="bg-white w-[30%] bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none text-lg font-medium"
                        onClick={handleGenerateResponse}>Envoyer
                    </button>
                </div>
                <div className={'my-5'}>
                    <div className={'flex flex-col space-y-1'}>
                        {question.map((item, index) => (
                            <>
                                <div
                                    className={'w-full px-4 py-2 rounded-xl bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75'}>
                                    {item}
                                </div>
                                {
                                    !response[index] ? (
                                        <div
                                            key={index}
                                            className={'w-full px-4 py-2 rounded-xl bg-slate-700 bg-opacity-70 focus:outline-none focus:bg-opacity-75'}>
                                            ....
                                        </div>
                                    ) : (
                                        <div
                                            key={index}
                                            className={'w-full px-4 py-2 rounded-xl bg-slate-700 bg-opacity-70 focus:outline-none focus:bg-opacity-75'}>
                                            {response[index]}
                                        </div>
                                    )
                                }

                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Chatbot;
