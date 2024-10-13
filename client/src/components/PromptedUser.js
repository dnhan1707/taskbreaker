import React, {useState, useEffect} from 'react';
import styles from './PromptedUser.module.css';

const PromptedUser = ({name, tasks}) => {
    const calculateDaysBetween = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const timeDifference = endDate - startDate;

        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        let output;

        if(daysDifference === 1){
            output = " | " + daysDifference + " day";
        }
        else if(daysDifference === 0){
            output = "";
        }
        else{
            output = " | " + daysDifference + " days";
        }

        return daysDifference;
    };

    const [estimatedTime, setEstimatedTime] = useState(0);

    useEffect(() => {
        let currentEstimatedTime = 0;

        for(const task of tasks){
            currentEstimatedTime += calculateDaysBetween(task.start_day, task.end_day);
        }

        setEstimatedTime(currentEstimatedTime / 2);
    }, [tasks]);

    return (
        <div className={styles.promptedUser}>
            <p className={styles.name}>{name}'s Tasks</p>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.task}>
                        <p>{task.task}</p>
                    </li>
                ))}
            </ol>
            <p className={styles.estimateAI}>Estimated completion: {estimatedTime} day{estimatedTime !== 1 ? 's' : ''}</p>
        </div>

    );
};

export default PromptedUser;