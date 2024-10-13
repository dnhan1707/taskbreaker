import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import PromptedUser from "./PromptedUser.js";
import DashboardBento from './DashboardBento.js';
import loadingGif from '../images/loading.gif';

const Dashboard = () => {
    const [textInput, setTextInput] = useState("");
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const fetchKindo = async (user_prompt_text) => {
        setLoading(true);
        setShowPreview(true);
        try {
            const response = await fetch("http://localhost:8080/kion", {
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
            console.log(responseData.result); // Log to verify structure
            setLoading(false);
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

            <DashboardBento
                name="Make"
                content={<div className={styles.searchContainer}>
                    <input
                        className={styles.searchBar}
                        type="text"
                        placeholder="Type a task"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                submitPrompt();
                            }
                        }}
                    />

                    <div className={styles.searchButton} onClick={submitPrompt}>
                        <svg width="32" height="32" stroke="#e1e1e1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                            <path d="m86.18 47.238-70-30c-1.0742-0.4375-2.3008-0.21484-3.1562 0.56641-0.85547 0.78125-1.1836 1.9883-0.84375 3.0938l7.1797 23.102c0.26562 0.82812 0.86719 1.5039 1.6602 1.8594l9.4805 4.1406-9.4805 4.1211c-0.79297 0.35547-1.3945 1.0312-1.6602 1.8594l-7.2188 23.121c-0.31641 0.92188-0.16797 1.9414 0.39844 2.7344 0.57031 0.79297 1.4844 1.2656 2.4609 1.2656 0.40625-0.003906 0.80469-0.082031 1.1797-0.24219l70-30c1.1055-0.46875 1.8242-1.5586 1.8242-2.7578 0-1.2031-0.71875-2.2891-1.8242-2.7617zm-66.379 27.441 4.8789-15.602 14.52-6.3203v0.003907c1.0977-0.48047 1.8047-1.5664 1.8008-2.7617 0.007812-1.1914-0.70312-2.2734-1.8008-2.7383l-14.52-6.3398-4.8789-15.602 57.578 24.68z"/>
                        </svg>
                    </div>

                    <div>Regenerate</div>
                </div>  
                }
            />

            {showPreview && (<DashboardBento
                name="Preview"
                content={<div>
                    {loading && (<img src={loadingGif} alt='loading_gif' width="80" height="80"/>)}
                    {Object.entries(result).map(([name, tasks]) => (
                        <PromptedUser key={name} name={name} tasks={tasks} />
                    ))}
                </div>  
                }
            />)}
        </div>
    );
};

export default Dashboard;