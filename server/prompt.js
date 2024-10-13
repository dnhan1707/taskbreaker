import getMembersListSkill from "./getMembersInfo.js";

async function user_prompt(task, is_regenerate) {
    const memberSkills = await getMembersListSkill(); // Await the result
    let prompt = `
                Imagine you are the manager of a team, break down the task given below. Make these tasks small and easy to manage almost as if they were steps that the member could follow. Please be as specific as possible.
                    Please stick to the project more than team members' skills since they may not know it, so just assign the thing that they need help with. Everyone must have a number of tasks equally. Assign these sub-tasks to the following team members in a way that best fits all the available team members. All tasks are objects that take the following format: 
                {task: [STRING OF TASK], start_day: [DATE], end_day: [DATE], need_help: [STRING OF WHERE THE MEMBER NEEDS ASSISTANCE]}

                If the team member does not need assistance, the string should be "N/A."

                The output should be an object that has the key as the member name, and the value as an array of the task objects. DO NOT GIVE ME AN EXPLANATION, JUST GIVE THE OUTPUT AND NOTHING ELSE. DO NOT WRAP THE JSON CODE IN JSON MARKERS.

                Task: ${task}
                Members: ${JSON.stringify(memberSkills)}`;
    if(is_regenerate){
        prompt = 'Use the same task and members list but re-generate a new and better idea. ' + prompt;
    }
    return prompt;
}


export default user_prompt;
