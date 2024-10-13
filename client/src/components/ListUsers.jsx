// import React, { Fragment, useState, useEffect } from "react";
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../../server/firebase/firebase';

// const ListUsers = () => {
//     const [users, setUsers] = useState([]);  // Store users in an array
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const usersCollection = collection(db, 'users');  // Target "users" collection

//                 const snapshot = await getDocs(usersCollection);
                
//                 const userList = snapshot.docs.map(user => user.data());
//                 if(userList.length == 0){
//                     console.log("empty")
//                 }
//                 // console.log("here", snapshot)

//                 // const userList = snapshot.docs.map(doc => ({
//                 //     id: doc.id,
//                 //     ...doc.data()
//                 // }));
//                 console.log(userList);
//                 setUsers(userList);  // Store the array of users
//                 setError(null);  // Clear previous errors if any
//             } catch (err) {
//                 console.error("Error fetching users: ", err.message);
//                 setError("Failed to fetch users");
//             } finally {
//                 setLoading(false);  // Stop the loading state
//             }
//         };

//         fetchUsers();  // Call the function on component mount
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

// return (
//     <Fragment>
//         <h2>User List</h2>
//         {users.length === 0 ? (
//             <p>No users found.</p>
//         ) : (
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.id}>
//                         <p><strong>Name:</strong> {user.name}</p>
//                         <p><strong>Email:</strong> {user.email}</p>
//                         <p><strong>Role:</strong> {user.role}</p>
//                         <p><strong>Project Title:</strong> {user.project_title}</p>
//                         <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
//                         <p><strong>Assigned Tasks:</strong> {user.assigned_tasks.join(', ')}</p>
//                     </li>
//                 ))}
//             </ul>
//         )}
//     </Fragment>
// );

// };

// export default ListUsers;
