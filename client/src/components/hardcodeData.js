const users = {
    user1 : {
        name: 'khant',
        email: 'knhl@gmail.com',
        role: 'admin',
        skills: ['React', 'Angular'],
    },
    user2 : {
        name: 'khant',
        email: 'knhl@gmail.com',
        role: 'member',
        skills: ['React', 'Angular'],
    },
}

const user_tasks = {
    user1 : {
            task1 : { status : 'progress', task_description : 'grow tree', startDate : 'October 12', endDate : 'October 15', need_help : 'Yes' },
            task2 : { status: 'pending', task_description : 'cut tree', startDate : 'October 15', endDate : 'October 20', need_help : 'Yes' },
    },
    user2 : {
        task1 : { status : 'completed', task_description : 'grow tree', startDate : 'October 12', endDate : 'October 15', need_help : 'Yes'  },
        task2 : { status: 'pending', task_description : 'cut tree', startDate : 'October 12', endDate : 'October 15', need_help : 'Yes'  }
    },
}
