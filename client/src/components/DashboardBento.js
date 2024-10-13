import React, { useState } from 'react';
import styles from './DashboardBento.module.css';

const DashboardBento = ({name, content}) => {
    return (
        <div className={styles.dashboardBento}>
            <h3 className={styles.name}>{name}</h3>
            {content}
        </div>
    );
};

export default DashboardBento;