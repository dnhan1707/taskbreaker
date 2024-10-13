import { doc, setDoc, getDoc } from 'firebase/firestore';
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

// Main function to insert or update tasks into Firestore
async function insertTasks(tasksByUser) {
    try {
        console.log(tasksByUser); // Log the incoming tasks for debugging

        for (const [userName, taskList] of Object.entries(tasksByUser)) {
            const userDocRef = doc(db, "user_tasks", userName); // Firestore reference

            // Fetch the current document to check if it exists
            const docSnapshot = await getDoc(userDocRef);
            let existingFields = [];

            if (docSnapshot.exists()) {
                // If the document exists, get the current fields
                existingFields = Object.keys(docSnapshot.data()).filter(key => key.startsWith('task_'));
            }

            // Determine the next task index
            const nextTaskIndex = existingFields.length + 1; // +1 because we are adding new tasks

            // Prepare the tasks to be added
            const taskData = {};

            taskList.forEach((task, index) => {
                const taskKey = `task_${nextTaskIndex + index}`; // Generate dynamic task name

                // Determine the task status based on the need_help field and the start date
                let status;
                if (task.need_help != 'N/A') {
                    status = 'Need Help';
                } else if (isToday(task.start_day)) {
                    status = 'In Progress';
                } else {
                    status = 'Waiting';
                }

                // Create a new task object
                taskData[taskKey] = {
                    end_day: task.end_day,
                    start_day: task.start_day,
                    need_help: task.need_help,
                    status: status, // Set the computed status
                    task: task.task,
                };
            });

            // Update the document with the new tasks
            await setDoc(userDocRef, taskData, { merge: true });

            console.log(`Added tasks for user: ${userName}`);
        }

        console.log("Tasks inserted/added successfully.");
    } catch (error) {
        console.error("Error inserting/adding tasks:", error); // Log any errors
        throw error;
    }
}

export default insertTasks;
