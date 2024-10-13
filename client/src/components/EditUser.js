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
                    <button className={styles.saveButton} onClick={handleSave}>
                        Save
                    </button>
                    <ul>
                        {editedTasks.map((task, index) => (
                            <li key={index} className={styles.task}>
                                <input
                                    type="text"
                                    value={task.task}
                                    onChange={(e) => handleInputChange(index, 'task', e.target.value)}
                                />
                                <input
                                    type="date"
                                    value={task.start_day}
                                    onChange={(e) => handleInputChange(index, 'start_day', e.target.value)}
                                />
                                <input
                                    type="date"
                                    value={task.end_day}
                                    onChange={(e) => handleInputChange(index, 'end_day', e.target.value)}
                                />
                                <select
                                    value={task.need_help}
                                    onChange={(e) => handleInputChange(index, 'need_help', e.target.value)}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
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
