import React from 'react';
import styles from './styles.module.css';

import motivationSvg from './img/High Voltage.svg';
import lifeSvg from './img/Seedling.svg';
import wisdomSvg from './img/Crystal Ball.svg';
import loveSvg from './img/Revolving Hearts.svg';
import technologySvg from './img/Laptop.svg';
import creativitySvg from './img/Artist Palette.svg';
import changeSvg from './img/Flexed Biceps.svg';
import inspirationSvg from './img/Dizzy.svg';
import leadershipSvg from './img/1st-Place-Medal_1f9472.svg';
import happinessSvg from './img/Slightly Smiling Face.svg';
import imaginationSvg from './img/Rainbow.svg';
import friendshipSvg from './img/Busts In Silhouette.svg';
import classNames from 'classnames';

export type IconType = 'motivation'
    | 'life'
    | 'wisdom'
    | 'love'
    | 'technology'
    | 'creativity'
    | 'change'
    | 'inspirational'
    | 'leadership'
    | 'happiness'
    | 'imagination'
    | 'friendship';

const IconDictionary: Record<IconType, {icon: string; alt: string}> = {
    motivation: {icon: motivationSvg, alt: 'Motivation'},
    life: {icon: lifeSvg, alt: 'Life'},
    wisdom: {icon: wisdomSvg, alt: 'Wisdom'},
    love: {icon: loveSvg, alt: 'Love'},
    technology: {icon: technologySvg, alt: 'Technology'},
    creativity: {icon: creativitySvg, alt: 'Creativity'},
    change: {icon: changeSvg, alt: 'Change'},
    inspirational: {icon: inspirationSvg, alt: 'Inspiration'},
    leadership: {icon: leadershipSvg, alt: 'Leadership'},
    happiness: {icon: happinessSvg, alt: 'Happiness'},
    imagination: {icon: imaginationSvg, alt: 'Imagination'},
    friendship: {icon: friendshipSvg, alt: 'Friendship'},
};

type IconButtonProps = {
    iconType: IconType;
    onClick: () => void;
    isActive?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
                                                          iconType = 'motivation',
                                                          onClick,
                                                          isActive = false
}) => {


    const handleClick = () => {
        onClick();
    };

    const iconData = IconDictionary[iconType];

    if (!iconData) {
        console.log(`Icon type ${iconType} not found`);
        return null;
    }

    const {icon, alt} = iconData;

    return (
        <button
            className={classNames(styles.iconButton, {[styles.active]: isActive})}
            onClick={handleClick}
        >
            <img src={icon} alt={alt} className={styles.img}/>
            <p  className={styles.text}>{alt}</p>
        </button>
    );
};