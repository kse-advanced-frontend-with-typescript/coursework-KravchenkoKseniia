import React from 'react';
import styles from './styles.module.css';
import {
    FacebookIcon, FacebookShareButton,
    LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton,
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
            <FacebookShareButton hashtag={'#123'} url={process.env.BASE_URL ?? ''}>
                <FacebookIcon size={50} round={true}/>
            </FacebookShareButton>
            <LinkedinShareButton url={process.env.BASE_URL ?? ''} >
                <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <RedditShareButton url={process.env.BASE_URL ?? ''} >
                <RedditIcon size={50} round={true} />
            </RedditShareButton>
            <TelegramShareButton url={process.env.BASE_URL ?? ''} >
                <TelegramIcon size={50} round={true} />
            </TelegramShareButton>
            <ThreadsShareButton url={process.env.BASE_URL ?? ''}>
                <ThreadsIcon size={50} round={true} />
            </ThreadsShareButton>
            <TwitterShareButton url={process.env.BASE_URL ?? ''} >
                <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
            <ViberShareButton url={process.env.BASE_URL ?? ''}>
                <ViberIcon size={50} round={true} />
            </ViberShareButton>
            <WhatsappShareButton url={process.env.BASE_URL ?? ''} >
                <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
            <PinterestShareButton url={process.env.BASE_URL ?? ''} media={'screen'}>
                <PinterestIcon size={50} round={true} />
            </PinterestShareButton>
        </div>
    );

};