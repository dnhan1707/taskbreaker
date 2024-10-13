import React from 'react';
import styles from './EditUser.module.css';

const EditUser = ({name, tasks}) => {
    return (
        <div className={styles.editUser}>
            <p className={styles.name}>{name}</p>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.task}>
                        <p>Task: {task.task}</p>
                        <p>Start Day: {task.start_day}</p>
                        <p>End Day: {task.end_day}</p>
                        <p>Need Help: {task.need_help}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditUser;