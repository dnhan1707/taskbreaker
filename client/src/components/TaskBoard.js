import { useState } from "react";

function TaskBoard() {
    const [data, setData] = useState({});  // Initialize data as an empty object
    const [loading, setLoading] = useState(false); // State for handling loading

    // Function to fetch tasks from the backend
    const fetchMemberTasks = async () => {
        setLoading(true); // Set loading state to true when the request starts
        try {
            const response = await fetch("http://localhost:8080/all_tasks", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response as JSON
            const responseData = await response.json();
            setData(responseData); // Update the data state with fetched tasks

        } catch (error) {
            console.error('Error fetching data:', error); // Handle any errors
        } finally {
            setLoading(false); // Stop loading once the request is finished
        }
    };

    // Handle the button click to trigger the task fetching
    const handleGetAllTasks = () => {
        fetchMemberTasks();
    };

    // Render the fetched data
    return (
        <div>
            <button onClick={handleGetAllTasks}>Get All Tasks</button>

            {loading && <p>Loading tasks...</p>} {/* Show a loading message when fetching data */}

            {/* Check if data is populated and display the tasks */}
            {Object.keys(data).length > 0 && (
                <div>
                    {/* Map through each person in the data */}
                    {Object.entries(data).map(([personName, tasks]) => (
                        <div key={personName}>
                            <h3>{personName}'s Tasks:</h3>
                            <ul>
                                {/* Map through each task for this person */}
                                {tasks.map((task, index) => (
                                    <li key={index}>
                                        <strong>Task:</strong> {task.task} <br />
                                        <strong>Start Day:</strong> {task.start_day} <br />
                                        <strong>End Day:</strong> {task.end_day} <br />
                                        <strong>Need Help:</strong> {task.need_help} <br />
                                        <strong>Status:</strong> {task.status}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* If data is empty after fetching, display a message */}
            {!loading && Object.keys(data).length === 0 && <p>No tasks available yet.</p>}
        </div>
    );
}

export default TaskBoard;
