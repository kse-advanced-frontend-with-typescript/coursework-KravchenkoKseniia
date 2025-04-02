import React from 'react';
import styles from './styles.module.css';
import {
    FacebookIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    ThreadsIcon,
    TwitterIcon,
    ViberIcon,
    WhatsappIcon,
} from 'react-share';



export const SocialMedia = () => {

    return (
        <div className={styles.container}>
            <FacebookIcon size={50} round={true} />
            <LinkedinIcon size={50} round={true} />
            <RedditIcon size={50} round={true} />
            <TelegramIcon size={50} round={true} />
            <ThreadsIcon size={50} round={true} />
            <TwitterIcon size={50} round={true} />
            <ViberIcon size={50} round={true} />
            <WhatsappIcon size={50} round={true} />
        </div>
    );

};
//localhost in .env