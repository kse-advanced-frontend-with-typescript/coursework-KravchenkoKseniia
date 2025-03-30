import {AppContext} from "../../context";
import React, {useContext, useState} from "react";
import styles from './styles.module.css';
import {User} from "../../modules/clients/user";
import {useNavigate} from "react-router";
import {Header} from "../../Components/Header/Header";
import {Toolbar, ToolbarType} from "../../Components/Toolbar/Toolbar";

export const SavedQuotesPage: React.FC = () => {
    const navigate = useNavigate();

    const handleToolbarClick = (tab: ToolbarType, index: number, isActive: boolean) => {
        let route = '';
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
            case "Today's quote":
                route = '/';
                break;
            default:
                route = '/';
        }

        if (route !== window.location.pathname) {
            navigate(route);
        }
    }


    return (
        <>

            <div className={styles.content}>
                <Header title={'SAVED QUOTES'}/>
                <Toolbar initialTab={1} onTabClick={handleToolbarClick}/>
            </div>
        </>
    )
}