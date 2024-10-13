import { useState, useEffect } from "react";
import styles from './TaskBoard.module.css';
import DashboardBento from './DashboardBento.js';
import handleDelete from "./handleDelete.js";

function TaskBoard() {
    const [data, setData] = useState({});  // Initialize data as an empty object
    const [loading, setLoading] = useState(false); // State for handling loading


    const fetchMemberTasks = async () => {
        setLoading(true); // Set loading state to true when the request starts
        try {
            const response = await fetch("http://localhost:8080/all_tasks", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const responseData = await response.json();
            setData(responseData); // Update the data state with fetched tasks
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading once the request is finished
        }
    };

    useEffect(() => {
        fetchMemberTasks();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? '' : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
    };

    return (
        <div className={styles.trelloContainer}>
            {Object.entries(data).map(([personName, tasks]) => (
                <DashboardBento 
                    name={personName}
                    content={
                        <div>
                            <ul>
                                {tasks.map((task) => (
                                    <div key={task.id} className={styles.taskBorder}>
                                        <li className={styles.task}>
                                            <div className={styles.taskHeader}> 
                                                <p>{task.task}</p>
                                                <svg 
                                                    onClick={() => handleDelete(task.task)}
                                                    width="25" height="25" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    viewBox="-5.0 -10.0 110.0 135.0">
                                                    <path fill="#555555" d="m19.059 26.961h64.879v54.945c0.003906 7.207-5.8828 13.094-13.09 13.094h-41.695c-7.207 0-13.094-5.8867-13.094-13.094v-54.945zm44.254 6v38.301c0 3.9492-6 3.9492-6 0v-38.301h-14.625v38.301c0 3.9492-6 3.9492-6 0v-38.301h-14.629v48.945c0 3.8945 3.1992 7.0938 7.0938 7.0938h41.695c3.8945 0 7.0938-3.1992 7.0938-7.0938v-48.945zm-13.312-27.961c6.2812 0 12.488 3.8398 13.371 9.9336h25.125c3.9492 0 3.9492 6 0 6h-76.996c-3.9492 0-3.9492-6 0-6h25.125c0.88672-6.0938 7.0938-9.9336 13.375-9.9336zm5.543 7.7891c-3.9727-3.1641-11.145-1.9102-12.746 2.1484h14.402c-0.3125-0.80469-0.89062-1.543-1.6562-2.1484z"/>
                                                </svg>
                                            </div>
                                            <div className={styles.taskFooter}>
                                                <div className={styles.dateContainer}>
                                                    <p>{formatDate(task.end_day)}</p>
                                                </div>
                                                <div className={styles.statusContainer}>
                                                    <p>{task.status}</p>
                                                    {task.need_help !== "N/A" && (
                                                        <div className={styles.tooltipContainer}>
                                                            <span className={styles.tooltipText}>{task.need_help}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>    
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    }
                    size="trello"
                />
            ))}

            {!loading && Object.keys(data).length === 0 && <p>No tasks available yet.</p>}
        </div>
    );
}

export default TaskBoard;
