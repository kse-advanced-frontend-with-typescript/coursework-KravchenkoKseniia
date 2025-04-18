import {Toolbar, ToolbarType} from '../../Components/Toolbar/Toolbar';
import {BigQuote} from '../../Components/BigQuote/BigQuote';
import {Header} from '../../Components/Header/Header';
import {AppContext} from '../../context';
import {useNavigate} from 'react-router';
import React from 'react';
import styles from './styles.module.css';
import {SocialMedia} from '../../Components/SocialMedia/SocialMedia';

export const SharePage: React.FC = () => {
    const navigate = useNavigate();
    const [shareNotification, setShareNotification] = React.useState<{level: 'error' | 'success' | 'info' | 'warning', message: string} | null>(null);
    const { currentQuote } = React.useContext(AppContext);
    const handleToolbarClick = (tab: ToolbarType) => {
        let route : string;
        switch (tab.page) {
            case 'Settings':
                route = '/settings';
                break;
            case 'Saved quotes':
                route = '/save';
                break;
            case 'Shared with':
                route = '/share';
                break;
            case 'Today\'s quote':
                route = '/';
                break;
            default:
                route = '/';
        }

        if (route !== window.location.pathname) {
            navigate(route);
        }
    };

    if (!currentQuote) {
        setShareNotification({level: 'error', message: 'No Quote to share'});
    }
    return (
        <>
            <Header title='SHARE WITH'/>

            <div className={styles.container}>
                <BigQuote quote={currentQuote?.content} author={currentQuote?.author} />
            </div>

            <SocialMedia/>
            <Toolbar initialTab={2} onTabClick={handleToolbarClick} />
        </>
    );
};