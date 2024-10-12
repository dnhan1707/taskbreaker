import React, { useState} from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [prompt, setPrompt] = useState("");
    const [textInput, setTextInput] = useState("");

    function submitPrompt(){
        setPrompt(textInput);
        console.log(prompt);
    }

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>

            <div>
                <h3>Create</h3>
                <input
                    type="text"
                    placeholder="Type a task"
                    onChange={(e) => setTextInput(e.target.value)}
                />

                <button type="button" onClick={submitPrompt}>Submit</button>
            </div>



        </div>
    );
};

export default Dashboard;