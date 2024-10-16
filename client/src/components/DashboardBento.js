import React from 'react';
import styles from './DashboardBento.module.css';

const DashboardBento = ({name, content, size}) => {
    if(size == "normal"){
        if(name == "Preview"){
            return (
                <div className={styles.dashboardBentoNormalAI}>
                        <div className={styles.headingContainer}>
                            <h3 className={styles.name}>{name}</h3>
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                <g>
                                <path fill="#ffffff" d="m68.688 53.613c1.5234-0.54297 2.543-1.9961 2.543-3.6133s-1.0234-3.0703-2.5391-3.6133l-6.9688-2.5117c-6.8828-2.4766-12.25-7.8516-14.73-14.73l-2.5117-6.9688c-0.54688-1.5156-1.9961-2.5391-3.6055-2.5391h-0.003906c-1.6133 0-3.0625 1.0195-3.6133 2.5391l-2.5078 6.9688c-2.4805 6.8828-7.8516 12.254-14.734 14.73l-6.9609 2.5117c-1.5234 0.54688-2.5469 1.9961-2.5469 3.6133s1.0234 3.0664 2.5391 3.6133l6.9688 2.5117c6.8828 2.4766 12.25 7.8477 14.73 14.73l2.5117 6.9727c0.54688 1.5156 2 2.5352 3.6133 2.5352h0.003906c1.6133 0 3.0625-1.0234 3.6055-2.5391l2.5117-6.9688c2.4766-6.8828 7.8516-12.25 14.73-14.73zm-9.082-3.3711c-8.6406 3.1133-15.383 9.8516-18.492 18.492l-0.24219 0.67578-0.24219-0.67578c-3.1172-8.6406-9.8555-15.383-18.492-18.492l-0.67578-0.24219 0.67578-0.24219c8.6406-3.1133 15.383-9.8516 18.492-18.492l0.24219-0.67578 0.24219 0.67578c3.1133 8.6406 9.8516 15.383 18.492 18.492l0.67578 0.24219z"/>
                                <path fill="#ffffff" d="m57.961 23.32 3.5273 1.2734c3.0547 1.1016 5.4297 3.4805 6.5312 6.5312l1.2695 3.5234c0.49609 1.3828 1.8164 2.3086 3.2812 2.3086 1.4648 0 2.7891-0.92969 3.2812-2.3047l1.2734-3.5273c1.1016-3.0547 3.4805-5.4336 6.5312-6.5312l3.5312-1.2734c1.3711-0.49609 2.3008-1.8125 2.3047-3.2734 0.003906-1.4609-0.91406-2.7812-2.3047-3.2891l-3.5312-1.2656c-3.0508-1.1016-5.4297-3.4805-6.5312-6.5312l-1.2734-3.5273c-0.49609-1.3828-1.8125-2.3086-3.2773-2.3086-1.4688 0-2.7891 0.92969-3.2812 2.3047l-1.2734 3.5273c-1.1016 3.0547-3.4805 5.4297-6.5312 6.5312l-3.5391 1.2734c-1.375 0.5-2.3008 1.8203-2.2969 3.2852 0.007812 1.4648 0.93359 2.7812 2.3086 3.2734zm14.613-9.3984c1.4805 2.5391 3.5859 4.6406 6.1172 6.1172-2.5391 1.4805-4.6406 3.5859-6.1172 6.1172-1.4805-2.5352-3.5859-4.6406-6.1172-6.1172 2.5352-1.4805 4.6367-3.582 6.1172-6.1172z"/>
                                <path fill="#ffffff" d="m87.184 76.68-3.5273-1.2734c-3.0508-1.1016-5.4297-3.4805-6.5312-6.5312l-1.2734-3.5273c-0.49609-1.3789-1.8164-2.3047-3.2812-2.3047-1.4688 0-2.7891 0.92969-3.2812 2.3047l-1.2734 3.5273c-1.1016 3.0547-3.4805 5.4336-6.5312 6.5312l-3.5234 1.2695c-1.3789 0.49219-2.3047 1.8125-2.3086 3.2734-0.003906 1.4609 0.91797 2.7852 2.3047 3.2891l3.5273 1.2734c3.0547 1.1016 5.4336 3.4766 6.5312 6.5312l1.2695 3.5234c0.50391 1.3789 1.8203 2.3086 3.2891 2.3086s2.7891-0.92969 3.2812-2.3047l1.2734-3.5273c1.1016-3.0508 3.4805-5.4297 6.5312-6.5312l3.543-1.2734c1.3711-0.50391 2.293-1.8203 2.2891-3.2852 0-1.4648-0.93359-2.7773-2.3086-3.2734zm-14.609 9.3984c-1.4805-2.5391-3.5859-4.6406-6.1172-6.1172 2.5352-1.4805 4.6406-3.5859 6.1172-6.1172 1.4805 2.5352 3.5859 4.6406 6.1172 6.1172-2.5312 1.4805-4.6367 3.582-6.1172 6.1172z"/>
                                </g>
                            </svg>
                        </div>
                        {content}
                </div>
            );
        }
        else{
            return (
                <div className={styles.dashboardBentoNormal}>
                    <h3 className={styles.name}>{name}</h3>
                    {content}
                </div>
            );
        }
        
    }

    if(size == "wide"){
        return (
            <div className={styles.dashboardBentoWide}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }

    if(size == "trello"){
        return (
            <div className={styles.dashboardBentoTrello}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }

    if(size == "ultraWide"){
        return (
            <div className={styles.dashboardBentoUltraWide}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }

    if(size == "wideEdit"){
        return (
            <div className={styles.dashboardBentoWideEdit}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }

    if(size == "normalTasks"){
        return (
            <div className={styles.dashboardBentoNormalTasks}>
                <h3 className={styles.name}>{name}</h3>
                {content}
            </div>
        );
    }
    
};

export default DashboardBento;