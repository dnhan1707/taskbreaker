import { useEffect, useState } from "react";
import user_prompt from "./prompt.js";

function HomePage() {
    const [result, setResult] = useState("");

    const fetchKindo = async () => {
        try {
            const API_KEY = "7a488c20-bf18-47e7-b5b1-79706bf8b572-ce792aa4d58109b9"; // Your API key
            const BASE_URL = 'https://llm.kindo.ai/v1/chat/completions'; // Kindo API URL

            const prompt = user_prompt("Build a task managing web app using React in a week");

            const data = {
                model: "azure/gpt-4o",
                messages: [{ role: "user", content: prompt }],
            };

            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    'api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Stringify the data
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setResult(responseData.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult("Error fetching data");
        }
    };

    useEffect(() => {
        fetchKindo(); // Call the async function inside useEffect
    }, []);

    return (
        <>
            <h1>Hello</h1>
            <div>
               {result ? <p>{result}</p> : <p>Loading...</p>}
           </div>
            </>
    );
}

export default HomePage;
