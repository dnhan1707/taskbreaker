import React from 'react';
import styles from './PromptedUser.module.css';

const PromptedUser = ({name, tasks}) => {
    return (
        <div>
            <p>{name}</p>
            
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.task}>
                        <p><strong>Task:</strong> {task.task}</p>
                        <p><strong>Start Day:</strong> {task.start_day}</p>
                        <p><strong>End Day:</strong> {task.end_day}</p>
                        <p><strong>Need Help:</strong> {task.need_help}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromptedUser;