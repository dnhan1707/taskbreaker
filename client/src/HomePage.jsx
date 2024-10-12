import { useEffect, useState } from "react";

function HomePage() {
    const [result, setResult] = useState("");

    const fetchKindo = async () => {
        try {
            const response = await fetch("/kindo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse JSON from the response
            setResult(data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult("Error fetching data"); // Optionally handle error state
        }
    };

    useEffect(() => {
        fetchKindo(); // Call the async function inside useEffect
    }, []);

    return (
        <>
            <h1>Hello</h1>
            <p>{result}</p>
        </>
    );
}

export default HomePage;
