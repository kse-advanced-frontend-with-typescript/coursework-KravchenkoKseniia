import React from 'react';
import styles from './styles.module.css';
import lensSvg from './img/Lens.svg';
import islandSvg from './img/Island.svg';
import wifiSvg from './img/Wifi.svg';
import signalSvg from './img/Mobile Signal.svg';
import batterySvg from './img/_StatusBar-battery.svg';

export const StatusBar = () => {
    return (
        <div className={styles.statusBar}>
            <div className={styles.leftSide}>
                <p className={styles.time}>9:41</p>
            </div>
            <div className={styles.island}>
                <div className={styles.islandImg}>
                    <img alt="lens" src={lensSvg} className={styles.lens}/>
                    <img alt="island" src={islandSvg}/>
                </div>
            </div>
            <div className={styles.rightSide}>
                <img alt="signal" src={signalSvg} className={styles.signal}/>
                <img alt="wifi" src={wifiSvg} className={styles.wifi}/>
                <img alt="battery" src={batterySvg} className={styles.battery}/>
            </div>
        </div>
    );
};
