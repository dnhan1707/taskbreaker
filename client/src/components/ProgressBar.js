import { useState, useEffect } from "react";
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const [data, setData] = useState({});
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

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
        setData(responseData);  // Update the data state with fetched tasks
        calculatePercentage(responseData);
        console.log(responseData);

    } catch (error) {
        console.error('Error fetching data:', error); // Handle any errors
    } finally {
        setLoading(false); // Stop loading once the request is finished
    }
};

useEffect(() => {
    fetchMemberTasks();
}, [])

function calculatePercentage(fetchedData){
    const totalTasks = Object.values(fetchedData).reduce((acc, tasks) => acc + tasks.length, 0);
    const completedTasks = Object.values(fetchedData).reduce(
        (acc, tasks) => acc + tasks.filter(task => task.status.toLowerCase() === 'completed').length,
        0
    );

    if (totalTasks > 0) {
        setProgress((completedTasks / totalTasks) * 100);
    }

    console.log(progress);
}

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{Math.round(progress)}% completed</p>
    </div>
  );
};

export default ProgressBar;