import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase/firebase.js';

// Helper function to check if the task's start date is today
function isToday(dateString) {
    const today = new Date();
    const [year, month, day] = dateString.split('-').map(Number); // Parse the date string
    const taskDate = new Date(year, month - 1, day); // Month is 0-indexed in JS

    return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
    );
}

// Main function to insert tasks into Firestore
async function insertTasks(tasksByUser) {
    try {
        console.log(tasksByUser); // Log the incoming tasks for debugging

        for (const [userName, taskList] of Object.entries(tasksByUser)) {
            const userDocRef = doc(db, "user_tasks", userName); // Firestore reference
            console.log(`Inserting tasks for user: ${userName}`);

            let taskData = {};

            taskList.forEach((task, index) => {
                const taskKey = `task_${index + 1}`;

                // Determine the task status based on the need_help field and the start date
                let status;
                if (task.need_help === 'N/A') {
                    status = 'Need Help';
                } else if (isToday(task.start_day)) {
                    status = 'In Progress';
                } else {
                    status = 'Waiting';
                }

                taskData[taskKey] = {
                    end_day: task.end_day,
                    start_day: task.start_day,
                    need_help: task.need_help,
                    status: status, // Set the computed status
                    task: task.task,
                };
            });

            await setDoc(userDocRef, taskData, { merge: true }); // Use merge to avoid overwriting
        }

        console.log("Tasks inserted successfully.");
    } catch (error) {
        console.error("Error inserting tasks:", error); // Log any errors
        throw error;
    }
}

export default insertTasks;
