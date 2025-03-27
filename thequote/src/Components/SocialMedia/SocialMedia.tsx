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
            <FacebookIcon size={32} round={true} />
            <LinkedinIcon size={32} round={true} />
            <RedditIcon size={32} round={true} />
            <TelegramIcon size={32} round={true} />
            <ThreadsIcon size={32} round={true} />
            <TwitterIcon size={32} round={true} />
            <ViberIcon size={32} round={true} />
            <WhatsappIcon size={32} round={true} />
        </div>
    );

};