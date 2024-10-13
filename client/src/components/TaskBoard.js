import { useState, useEffect, useCallback } from "react";
import styles from './TaskBoard.module.css';
import DashboardBento from './DashboardBento.js';
import ProgressBar from "./ProgressBar.js";
import TaskPieChart from "./TaskPieChart.js";
import usePersistState from "../usePersistState.js";
import { v4 as uuidv4 } from 'uuid';


function TaskBoard({title}) {
    const [data, setData] = useState({});  // Initialize data as an empty object
    const [loading, setLoading] = useState(false); // State for handling loading

    let titleId = localStorage.getItem('currentTitleId');

    if (!titleId) {
        titleId = uuidv4();
        localStorage.setItem('currentTitleId', titleId);
    }    
    const [persistentTitle, setPersistentTitle] = usePersistState(title, `persistentTitle_${titleId}`);
    useEffect(() => {
        if (title) {
            setPersistentTitle(title);  // Persist title in localStorage
        }
    }, [title, setPersistentTitle]);

    useEffect(() => {
        if (title) {
            setPersistentTitle(title);  // Persist title in localStorage
        }
    }, [title, setPersistentTitle]);

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
    }; // Remove 'data' and 'loading' from dependencies

    useEffect(() => {
        fetchMemberTasks();
    }, []); // Fetch on mount


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
            <DashboardBento
                name="Project"
                content={<div className={styles.projectContainer}>
                    {(persistentTitle.length > 0) && (<div className={styles.projectNameContainer}>
                        <p className={styles.projectName}>{persistentTitle}</p>
                        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                            <defs>
                                <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: "#a886dc", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#798cd1", stopOpacity: 1 }} /> 
                                </linearGradient>
                            </defs>
                            
                            <g>
                            <path fill="url(#linearGradient)" d="m68.688 53.613c1.5234-0.54297 2.543-1.9961 2.543-3.6133s-1.0234-3.0703-2.5391-3.6133l-6.9688-2.5117c-6.8828-2.4766-12.25-7.8516-14.73-14.73l-2.5117-6.9688c-0.54688-1.5156-1.9961-2.5391-3.6055-2.5391h-0.003906c-1.6133 0-3.0625 1.0195-3.6133 2.5391l-2.5078 6.9688c-2.4805 6.8828-7.8516 12.254-14.734 14.73l-6.9609 2.5117c-1.5234 0.54688-2.5469 1.9961-2.5469 3.6133s1.0234 3.0664 2.5391 3.6133l6.9688 2.5117c6.8828 2.4766 12.25 7.8477 14.73 14.73l2.5117 6.9727c0.54688 1.5156 2 2.5352 3.6133 2.5352h0.003906c1.6133 0 3.0625-1.0234 3.6055-2.5391l2.5117-6.9688c2.4766-6.8828 7.8516-12.25 14.73-14.73zm-9.082-3.3711c-8.6406 3.1133-15.383 9.8516-18.492 18.492l-0.24219 0.67578-0.24219-0.67578c-3.1172-8.6406-9.8555-15.383-18.492-18.492l-0.67578-0.24219 0.67578-0.24219c8.6406-3.1133 15.383-9.8516 18.492-18.492l0.24219-0.67578 0.24219 0.67578c3.1133 8.6406 9.8516 15.383 18.492 18.492l0.67578 0.24219z"/>
                            <path fill="url(#linearGradient)" d="m57.961 23.32 3.5273 1.2734c3.0547 1.1016 5.4297 3.4805 6.5312 6.5312l1.2695 3.5234c0.49609 1.3828 1.8164 2.3086 3.2812 2.3086 1.4648 0 2.7891-0.92969 3.2812-2.3047l1.2734-3.5273c1.1016-3.0547 3.4805-5.4336 6.5312-6.5312l3.5312-1.2734c1.3711-0.49609 2.3008-1.8125 2.3047-3.2734 0.003906-1.4609-0.91406-2.7812-2.3047-3.2891l-3.5312-1.2656c-3.0508-1.1016-5.4297-3.4805-6.5312-6.5312l-1.2734-3.5273c-0.49609-1.3828-1.8125-2.3086-3.2773-2.3086-1.4688 0-2.7891 0.92969-3.2812 2.3047l-1.2734 3.5273c-1.1016 3.0547-3.4805 5.4297-6.5312 6.5312l-3.5391 1.2734c-1.375 0.5-2.3008 1.8203-2.2969 3.2852 0.007812 1.4648 0.93359 2.7812 2.3086 3.2734zm14.613-9.3984c1.4805 2.5391 3.5859 4.6406 6.1172 6.1172-2.5391 1.4805-4.6406 3.5859-6.1172 6.1172-1.4805-2.5352-3.5859-4.6406-6.1172-6.1172 2.5352-1.4805 4.6367-3.582 6.1172-6.1172z"/>
                            <path fill="url(#linearGradient)" d="m87.184 76.68-3.5273-1.2734c-3.0508-1.1016-5.4297-3.4805-6.5312-6.5312l-1.2734-3.5273c-0.49609-1.3789-1.8164-2.3047-3.2812-2.3047-1.4688 0-2.7891 0.92969-3.2812 2.3047l-1.2734 3.5273c-1.1016 3.0547-3.4805 5.4336-6.5312 6.5312l-3.5234 1.2695c-1.3789 0.49219-2.3047 1.8125-2.3086 3.2734-0.003906 1.4609 0.91797 2.7852 2.3047 3.2891l3.5273 1.2734c3.0547 1.1016 5.4336 3.4766 6.5312 6.5312l1.2695 3.5234c0.50391 1.3789 1.8203 2.3086 3.2891 2.3086s2.7891-0.92969 3.2812-2.3047l1.2734-3.5273c1.1016-3.0508 3.4805-5.4297 6.5312-6.5312l3.543-1.2734c1.3711-0.50391 2.293-1.8203 2.2891-3.2852 0-1.4648-0.93359-2.7773-2.3086-3.2734zm-14.609 9.3984c-1.4805-2.5391-3.5859-4.6406-6.1172-6.1172 2.5352-1.4805 4.6406-3.5859 6.1172-6.1172 1.4805 2.5352 3.5859 4.6406 6.1172 6.1172-2.5312 1.4805-4.6367 3.582-6.1172 6.1172z"/>
                            </g>
                        </svg>
                    </div>)}


                    <ProgressBar/>
                </div>}
                size="ultraWide"
            />

            {Object.entries(data).map(([personName, tasks]) => (
                <DashboardBento 
                    name={personName}
                    content={<div>
                        <TaskPieChart data={{ [personName]: tasks }} />
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
            {!loading && Object.keys(data).length === 0 && <DashboardBento 
                name="Tasks"
                content={<div><p className={styles.tasksText}>No tasks available yet.</p></div>}
                size="normalTasks"
            />}
        </div>
    );
}

export default TaskBoard;