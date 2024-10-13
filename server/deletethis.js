import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase/firebase.js';

/**
 * Deletes a task from Firestore using the provided taskId.
 * @param {Object} body - The request body containing the taskId.
 */
const deletethis = async ({ taskId }) => {
    console.log(`Attempting to delete task with ID: ${taskId}`); // Debug log

    try {
        const taskRef = doc(db, 'user_tasks', taskId); // Get document reference
        await deleteDoc(taskRef); // Delete the document
        console.log(`Task with ID: ${taskId} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting task:', error); // Log the error
        throw error; // Rethrow the error to be handled by Express
    }
};

export default deletethis;
