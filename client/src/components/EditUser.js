import React, { useState } from 'react';
import styles from './EditUser.module.css';

const EditUser = ({ name, tasks, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTasks, setEditedTasks] = useState(tasks || []); // Initialize to an empty array if tasks is not defined

    const handleInputChange = (index, field, value) => {
        const updatedTasks = [...editedTasks];
        updatedTasks[index] = { ...updatedTasks[index], [field]: value };
        setEditedTasks(updatedTasks);
    };

    const handleSave = () => {
        onEdit(name, editedTasks); // Save the edited tasks
        setIsEditing(false); // Exit editing mode
    };

    return (
        <div className={styles.editUser}>
            <p className={styles.name}>{name}</p>
            {isEditing ? (
                <>
                    <div className={styles.button} onClick={handleSave}>
                        <svg className={styles.saveIcon} width="33" height="33" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                            <defs>
                                <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: "#a886dc", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#798cd1", stopOpacity: 1 }} /> 
                                </linearGradient>
                            </defs>
                            <path fill="url(#linearGradient)" d="m69.988 12.449h-39.977c-9.5898 0-17.398 7.8008-17.398 17.398v40.301c0 9.5898 7.8008 17.398 17.398 17.398h5.6211c0.57031 0.12109 1.1602 0.17969 1.7695 0.17969h25.199c0.60938 0 1.1992-0.058593 1.7695-0.17969h5.6211c9.5898 0 17.398-7.8008 17.398-17.398v-40.297c0-9.5898-7.8008-17.398-17.398-17.398zm-8.7188 8.8906v9.3281c0 1.0117-0.82031 1.8281-1.8281 1.8281h-18.891c-1.0117 0-1.8281-0.82031-1.8281-1.8281v-9.3281c0-1.0117 0.82031-1.8281 1.8281-1.8281h18.891c1.0117 0 1.8281 0.82031 1.8281 1.8281zm-25.699 57.551v-21.07c0-1.0117 0.82031-1.8281 1.8281-1.8281h25.199c1.0117 0 1.8281 0.82031 1.8281 1.8281v21.07c0 0.73047-0.42969 1.3594-1.0508 1.6484h-26.75c-0.62109-0.28906-1.0508-0.92187-1.0508-1.6484zm44.82-8.75c0 5.3008-3.9805 9.6719-9.1094 10.309 0.089844-0.51172 0.14844-1.0312 0.14844-1.5586v-21.07c0-4.8711-3.9609-8.8281-8.8281-8.8281h-25.199c-4.8711 0-8.8281 3.9609-8.8281 8.8281v21.07c0 0.53125 0.058593 1.0508 0.14844 1.5586-5.1211-0.64062-9.1094-5.0117-9.1094-10.309l-0.003906-40.289c0-5.7305 4.6719-10.398 10.398-10.398h1.9297c-0.12891 0.60938-0.21094 1.2383-0.21094 1.8906v9.3281c0 4.8711 3.9609 8.8281 8.8281 8.8281h18.891c4.8711 0 8.8281-3.9609 8.8281-8.8281v-9.3281c0-0.64844-0.078126-1.2812-0.21094-1.8906h1.9297c5.7305 0 10.398 4.6719 10.398 10.398v40.301z"/>
                        </svg>
                    </div>
                    <ul>
                        {editedTasks.map((task, index) => (
                            <li key={index} className={styles.task}>
                                <label className={styles.inputContainer}>Task: <input
                                    type="text"
                                    value={task.task}
                                    onChange={(e) => handleInputChange(index, 'task', e.target.value)}
                                /></label>
                                <label className={styles.inputContainer}>Start Date: <input
                                    type="date"
                                    value={task.start_day}
                                    onChange={(e) => handleInputChange(index, 'start_day', e.target.value)}
                                /></label>
                                <label className={styles.inputContainer}>End Date: <input
                                    type="date"
                                    value={task.end_day}
                                    onChange={(e) => handleInputChange(index, 'end_day', e.target.value)}
                                /></label>
                                <label className={styles.inputContainer}>Needs Help? <select
                                    value={task.need_help}
                                    onChange={(e) => handleInputChange(index, 'need_help', e.target.value)}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select></label>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <div className={styles.button} onClick={() => setIsEditing(true)}>
                        <svg className={styles.editIcon} width="26" height="26" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125">
                            <defs>
                                <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: "#a886dc", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#798cd1", stopOpacity: 1 }} /> 
                                </linearGradient>
                            </defs>
                            <path fill="url(#linearGradient)" d="M82.6,2c-4,0-8,1.6-10.8,4.4L56.4,22H14C7.4,22,2,27.4,2,34v52c0,6.6,5.4,12,12,12h52c6.6,0,12-5.4,12-12V43.6L93.6,28  c6-6,6-15.6,0-21.6C90.6,3.6,86.8,2,82.6,2z M70,86c0,2.2-1.8,4-4,4H14c-2.2,0-4-1.8-4-4V34c0-2.2,1.8-4,4-4h34.4L34.6,43.8  c-8,8-12.6,18.8-12.4,30.2l0,0c0,2.2,1.8,4,4,4l0,0c11.4,0,22.2-4.4,30.2-12.4l13.8-13.8V86H70z M87.8,22.4L50.4,59.8  c-5.4,5.4-12.6,9-20.2,9.8c1-7.6,4.4-14.8,9.8-20.2L77.4,12c3-2.8,7.6-2.4,10.4,0.4C90.4,15.4,90.4,19.6,87.8,22.4z"/>
                        </svg>
                    </div>

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
                </>
            )}
        </div>
    );
};

export default EditUser;
