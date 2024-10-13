import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import user_prompt from "../prompt.js";
import PromptedUser from "./PromptedUser.js";

const Dashboard = () => {
    const [textInput, setTextInput] = useState("");
    const [result, setResult] = useState({});

    const fetchKindo = async (user_prompt_text) => {
        try {
            const API_KEY = "7a488c20-bf18-47e7-b5b1-79706bf8b572-ce792aa4d58109b9"; // Your API key
            const BASE_URL = 'https://llm.kindo.ai/v1/chat/completions'; // Kindo API URL

            const prompt = user_prompt(user_prompt_text);

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
            setResult(JSON.parse(responseData.choices[0].message.content));
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult("Error fetching data");
        }
    };

    function submitPrompt(){
        let temp = textInput;
        setTextInput("");
        fetchKindo(temp);
    };

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>

            <div>
                <h3>Create</h3>
                <input
                    type="text"
                    placeholder="Type a task"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />

                <button type="button" onClick={submitPrompt}>Submit</button>

                {Object.entries(result).map(([name, tasks]) => (
                    <PromptedUser key={name} name={name} tasks={tasks} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;