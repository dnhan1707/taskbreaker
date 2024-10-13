import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase.js';

async function getMembersListSkill() {
    let membersSkills = [];
    try {
        const userCollection = collection(db, "users");
        const snapShot = await getDocs(userCollection);
        const userList = snapShot.docs.map(user => user.data());

        if (userList.length === 0) {
            console.log("Empty");
        }

        userList.forEach((user) => {
            const userInfo = {
                name: user.name,
                skills: user.skills,
                interests: user.interests
            };
            membersSkills.push(userInfo); // Use push instead of append
        });
        console.log(membersSkills);
        return membersSkills; // Return the populated array
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }
}

export default getMembersListSkill;
