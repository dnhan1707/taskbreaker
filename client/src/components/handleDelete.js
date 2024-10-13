const handleDelete = async (task, setData) => {
    try {
        const response = await fetch(`http://localhost:8080/delete_task`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: task}),
        });
        
        console.log("Here", response);

        if (!response.ok) throw new Error('Failed to delete task');

        // Update the state to remove the deleted task from the UI
        setData((prevData) => {
            const updatedData = { ...prevData };
            for (const personName in updatedData) {
                updatedData[personName] = updatedData[personName].filter(t => t.id !== task.id);
            }
            return updatedData;
        });

        console.log(`Task with ID ${task} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export default handleDelete;
