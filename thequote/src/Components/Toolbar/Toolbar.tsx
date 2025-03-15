import React, {useState} from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

import gearSvg from './img/Gear.svg';
import redHeartSvg from './img/Red Heart.svg';
import peopleHuggingSvg from './img/People Hugging.svg';
import backhandIndexPointingRightSvg from './img/Backhand Index Pointing Right.svg';

type ToolbarProps = {
    initialTab?: number
}

const tabs = [
    {icon: gearSvg, alt: 'Gear', page: 'Settings'},
    {icon: redHeartSvg, alt: 'Red Heart', page: 'Saved quotes'},
    {icon: peopleHuggingSvg, alt: 'People Hugging', page: 'Shared with'},
    {icon: backhandIndexPointingRightSvg, alt: 'Backhand Index Pointing Right', page: 'Today\'s quote'}
]

export const Toolbar: React.FC<ToolbarProps> = ({initialTab = 0}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(initialTab);

    const clickHandler = (index: number) => {
        setActiveTabIndex(index);
        console.log(`Switched to ${tabs[index].alt}`);
    }

    return (
        <div className={styles.toolbar}>
            {tabs.map((tab, index) => (
                <button
                    key={tab.alt}
                    className={classNames(styles.tab, {[styles.active]: activeTabIndex === index})}
                    onClick={() => clickHandler(index)}
                >
                    <img src={tab.icon} alt={tab.alt}/>
                </button>
            ))}
        </div>
    )

};