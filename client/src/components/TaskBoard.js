import { useState, useEffect } from "react";
import styles from './TaskBoard.module.css';
import DashboardBento from './DashboardBento.js';

function TaskBoard({submitIsClick}) {
    const [data, setData] = useState({});  // Initialize data as an empty object
    const [loading, setLoading] = useState(false); // State for handling loading
    
    const fetchMemberTasks = async () => {
        try {
            setLoading(true); // Set loading state to true when the request starts

            const response = await fetch("http://localhost:8080/all_tasks", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response as JSON
            const responseData = await response.json();
            setData(responseData); // Update the data state with fetched tasks

        } catch (error) {
            console.error('Error fetching data:', error); // Handle any errors
        } finally {
            setLoading(false); // Stop loading once the request is finished
        }
    };
    useEffect(() => {
        fetchMemberTasks();
    }, [submitIsClick])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            console.error('Invalid date:', dateString); // Log if the date is invalid
            return ''; // Return an empty string or handle the error as you need
        }
        return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
    };

    return (
        <div className={styles.trelloContainer}>
            {Object.entries(data).map(([personName, tasks]) => (
                <DashboardBento 
                    name={personName}
                    content={<div>
                        <ul>
                        {tasks.map((task, index) => (
                            <div className={styles.taskBorder}>
                                <li key={index} className={styles.task}>
                                    <div className={styles.taskHeader}> 
                                        <p>{task.task}</p>
                                        <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                            <path fill="#555555" d="m19.059 26.961h64.879v54.945c0.003906 7.207-5.8828 13.094-13.09 13.094h-41.695c-7.207 0-13.094-5.8867-13.094-13.094v-54.945zm44.254 6v38.301c0 3.9492-6 3.9492-6 0v-38.301h-14.625v38.301c0 3.9492-6 3.9492-6 0v-38.301h-14.629v48.945c0 3.8945 3.1992 7.0938 7.0938 7.0938h41.695c3.8945 0 7.0938-3.1992 7.0938-7.0938v-48.945zm-13.312-27.961c6.2812 0 12.488 3.8398 13.371 9.9336h25.125c3.9492 0 3.9492 6 0 6h-76.996c-3.9492 0-3.9492-6 0-6h25.125c0.88672-6.0938 7.0938-9.9336 13.375-9.9336zm5.543 7.7891c-3.9727-3.1641-11.145-1.9102-12.746 2.1484h14.402c-0.3125-0.80469-0.89062-1.543-1.6562-2.1484z" fill-rule="evenodd"/>
                                        </svg>
                                    </div>

                                    <div className={styles.taskFooter}>
                                        <div className={styles.dateContainer}>
                                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100">
                                                <g><g><path fill="#555555" d="M50,10c10.684,0,20.729,4.161,28.284,11.716C85.84,29.271,90,39.315,90,50s-4.16,20.729-11.716,28.284    C70.729,85.839,60.684,90,50,90c-10.685,0-20.729-4.161-28.285-11.716C14.161,70.729,10,60.685,10,50s4.161-20.729,11.715-28.284    C29.271,14.161,39.315,10,50,10 M50,0C22.386,0,0,22.386,0,50s22.386,50,50,50s50-22.386,50-50S77.614,0,50,0L50,0z"/></g><g><polygon points="66.465,73.535 45,52.071 45,30 55,30 55,47.929 73.535,66.464   "/></g></g>
                                            </svg>
                                            <p>{formatDate(task.end_day)}</p>
                                        </div>
                                        
                                        <div className={styles.statusContainer}>
                                            <p> {task.status}</p>

                                            {(task.need_help != "N/A") && (<div className={styles.tooltipContainer}>
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 96 120" x="0px" y="0px">
                                                    <path fill="#FF6961" d="M48,16A32,32,0,1,0,80,48,32,32,0,0,0,48,16Zm0,60A28,28,0,1,1,76,48,28,28,0,0,1,48,76Z"/>
                                                    <path fill="#FF6961" d="M48,30a4,4,0,0,0-4,4V50a4,4,0,0,0,8,0V34A4,4,0,0,0,48,30Z"/>
                                                    <circle fill="#FF6961" cx="48" cy="62" r="4"/>
                                                </svg>
                                                <span className={styles.tooltipText}>{task.need_help}</span> 
                                            </div>)}
                                        </div>
                                    </div>    
                                </li>
                            </div>
                        ))}
                    </ul>
                    </div>}
                    size="trello"
                />
            ))}
            
            {/* If data is empty after fetching, display a message */}
            {!loading && Object.keys(data).length === 0 && <p>No tasks available yet.</p>}
        </div>
    );
}

export default TaskBoard;