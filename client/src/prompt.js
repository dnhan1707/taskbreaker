function user_prompt(task){
    const prompt = `Imagine you are the manager of a team, break down the task given below. Make these tasks small and easy to manage almost as if they were steps that the member could follow. PLease be as specific as possible
    Please stick to the project more than team members' skills since they may not know it so just assign the thing that they need help with. Everyone must have number of tasks equally. Assign these sub tasks to the following team members in a way that best fits all the available team members. All tasks are objects that take the following format 
{task: [STRING OF TASK], start_day: [DATE], end_day: [DATE], need_help: [STRING OF WHERE THE MEMBER NEEDS ASSISTANCE]}

If the team member does not need assistance, the string should be "N/A"

The output should be an object that has the key as the member name, and the value as an array of the task objects. DO NOT GIVE ME AN EXPLANATION JUST GIVE THE OUTPUT AND NOTHING ELSE

        Task: ${task}
        Members: [
            {
                "name": "Alice",
                "skills": ["JavaScript", "React Native", "Node.js", "GraphQL"],
                "interests": ["Mobile development", "UI/UX design", "E-commerce solutions"]
            },
            {
                "name": "Bob",
                "skills": ["Python", "Django", "PostgreSQL", "Docker"],
                "interests": ["Back-end development", "DevOps", "Cloud infrastructure"]
            },
            {
                "name": "Charlie",
                "skills": ["Adobe Creative Suite", "Figma", "Sketch"],
                "interests": ["Graphic design", "Branding", "User experience"]
            },
            {
                "name": "Diana",
                "skills": ["SEO", "Content Marketing", "Social Media Management", "Email Marketing"],
                "interests": ["Digital marketing", "Analytics", "Brand strategy"]
            },
            {
                "name": "Ethan",
                "skills": ["Project Management", "Agile Methodologies", "Scrum", "Kanban"],
                "interests": ["Team leadership", "Process improvement", "Stakeholder engagement"]
            }
        ]`;
    return prompt;
}


export default user_prompt;
