import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase.js';

async function getMembersTasks() {
    let membersTasks = {}; // Store each member's tasks by their name (document ID)
    try {
        const userCollection = collection(db, "user_tasks");
        const snapShot = await getDocs(userCollection);

        snapShot.docs.forEach(doc => {
            const tasks = doc.data(); // Get all task data from the document
            const memberName = doc.id; // Use the document ID as the member's name

            // Add the member's tasks under their name in the membersTasks object
            membersTasks[memberName] = [];

            // Iterate through each task (e.g., task_1, task_2) and store it in the array
            Object.keys(tasks).forEach(taskKey => {
                membersTasks[memberName].push(tasks[taskKey]);
            });
        });

        // console.log(membersTasks); // For debugging, log the populated task object
        return membersTasks; // Return the tasks for each member
    } catch (error) {
        console.error('Error fetching member tasks:', error);
        return {}; // Return an empty object in case of an error
    }
}

export default getMembersTasks;
