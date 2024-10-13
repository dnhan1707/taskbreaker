import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import PromptedUser from "./PromptedUser.js";

const Dashboard = () => {
    const [textInput, setTextInput] = useState("");
    const [result, setResult] = useState({});

    const fetchKindo = async (user_prompt_text) => {
        try {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt: user_prompt_text}), // Stringify the data
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData.result);
            setResult(JSON.parse(responseData.result));
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