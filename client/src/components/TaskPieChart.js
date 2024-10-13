import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import styles from './PieChart.module.css';

const TaskPieChart = ({ data }) => {
    // Prepare data for the pie chart
    const chartData = Object.entries(data).flatMap(([personName, tasks]) => {
        const completedCount = tasks.filter(task => task.status.toLowerCase() === 'completed').length;
        const helpCount = tasks.filter(task => task.status.toLowerCase() == 'need help').length;
        const waitingCount = tasks.filter(task => task.status.toLowerCase() == 'waiting').length;

        return [
            { name: `Completed`, value: completedCount },
            { name: `Waiting`, value: waitingCount },
            { name: `Needs Help`, value: helpCount },
        ];
    });

    // Define colors for the pie slices
    const COLORS = ['#798cd1', '#a886dc', '#FF6961'];

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="70%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%" // Center X
                        cy="50%" // Center Y
                        outerRadius={100} // Outer radius for pie chart
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TaskPieChart;