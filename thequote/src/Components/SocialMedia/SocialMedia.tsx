import React from 'react';
import styles from './styles.module.css';
import {
    FacebookIcon, FacebookShareButton,
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
            <FacebookShareButton hashtag={'#123'} url={'/share'}>
                <FacebookIcon size={50} round={true}/>
            </FacebookShareButton>
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