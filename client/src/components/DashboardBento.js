import React from 'react';
import styles from './DashboardBento.module.css';

const DashboardBento = ({name, content, size}) => {
    if(size == "normal"){
        return (
            <div className={styles.dashboardBentoNormal}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }

    if(size == "wide"){
        return (
            <div className={styles.dashboardBentoWide}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }
    
};

export default DashboardBento;