import React from 'react';
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
    
        return output;
    };

    return (
        <div className={styles.promptedUser}>
            <p className={styles.name}>{name}</p>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.task}>
                        <p>{task.task} {calculateDaysBetween(task.start_day, task.end_day)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromptedUser;