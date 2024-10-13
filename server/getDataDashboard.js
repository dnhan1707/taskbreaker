import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase.js';

async function getDataForDashBoard(){
    let memberTask = {};

    try {
        const memberTaskCollections = collection(db, "user_tasks");
        const snapShot = await getDocs(memberTaskCollections);

        snapShot.forEach(doc => {
            const personName = doc.id;
            const tasks = doc.data();

            const taskList = Object.values(tasks);
            memberTask[personName] = taskList
        });

        console.log(memberTask);
        return memberTask;
    } catch (error) {
        console.error("Error fetching member tasks:", error);
        return {};
    }
}
