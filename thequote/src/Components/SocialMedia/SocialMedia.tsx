import React from 'react';
import styles from './styles.module.css';
import {
    FacebookIcon, FacebookShareButton,
    LinkedinIcon, LinkedinShareButton,
    RedditIcon, RedditShareButton,
    TelegramIcon, TelegramShareButton,
    ThreadsIcon, ThreadsShareButton,
    TwitterIcon, TwitterShareButton,
    ViberIcon, ViberShareButton,
    WhatsappIcon, WhatsappShareButton,
} from 'react-share';



export const SocialMedia = () => {

    return (
        <div className={styles.container}>
            <FacebookShareButton hashtag={'#123'} url={'/share'}>
                <FacebookIcon size={50} round={true}/>
            </FacebookShareButton>
            <LinkedinShareButton url={'/share'} >
                <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <RedditShareButton url={'/share'} >
                <RedditIcon size={50} round={true} />
            </RedditShareButton>
            <TelegramShareButton url={'/share'} >
                <TelegramIcon size={50} round={true} />
            </TelegramShareButton>
            <ThreadsShareButton url={'/share'}>
                <ThreadsIcon size={50} round={true} />
            </ThreadsShareButton>
            <TwitterShareButton url={'/share'} >
                <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
            <ViberShareButton url={'/share'}>
                <ViberIcon size={50} round={true} />
            </ViberShareButton>
            <WhatsappShareButton url={'/share'} >
                <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
        </div>
    );

};
//localhost in .env