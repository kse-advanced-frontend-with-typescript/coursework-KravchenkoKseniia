import {Header} from '../../Components/Header/Header';
import {IconButton, IconType} from '../../Components/IconButton/IconButton';
import {Button} from '../../Components/Button/Button';
import {Toolbar, ToolbarType} from '../../Components/Toolbar/Toolbar';
import {AppContext} from '../../context';
import React, {useContext, useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useNavigate} from 'react-router';
import {NotificationElement} from "../../Components/NotificationElement/NotificationElement";

const iconTypes: IconType[] = [
    'motivation',
    'life',
    'wisdom',
    'love',
    'technology',
    'creativity',
    'change',
    'inspirational',
    'leadership',
    'happiness',
    'imagination',
    'friendship'
];

export const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const [selectedIcons, setSelectedIcons] = useState<IconType[]>([]);
    const {setUser, user} = useContext(AppContext);
    const [saveStatus, setSaveStatus] = useState<{level: 'error' | 'success' | 'info' | 'warning', message: string} | null>(null);

    useEffect(() => {
        if (user && user.length > 0 && user[0].categories) {
            setSelectedIcons(user[0].categories);
        }
    }, [user]);

    const handleCLick = (iconType: IconType) => {
        if (selectedIcons.includes(iconType)) {
            setSelectedIcons(selectedIcons.filter(icon => icon !== iconType));
        } else {
            setSelectedIcons([...selectedIcons, iconType]);
        }
    };

    const handleSave =  () => {
        if (user) {
            const updatedUser = [{...user[0], categories: selectedIcons}];
            setUser(updatedUser);
            console.log('Saved categories:', selectedIcons);
            setSaveStatus({level: 'success', message: 'Categories saved successfully'});
        }
        else {
            console.log('User not found');
            setSaveStatus({level: 'error', message: 'User not found'});
        }

    };

    const logout = () => {
        appContext.cleanUser()
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    }

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

    React.useEffect(() => {
        if (saveStatus) {
            const timer = setTimeout(() => setSaveStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [saveStatus]);

    return (
        <>

            <div className={styles.content}>
                <Header title={'SETTINGS'}/>
                { saveStatus &&
                    <NotificationElement level={saveStatus.level} message={saveStatus.message} />
                }
                <div className={styles.icons}>
                    {iconTypes.map((iconType) => (
                        <IconButton
                            key={iconType}
                            iconType={iconType}
                            onClick={() => handleCLick(iconType)}
                            isActive={selectedIcons.includes(iconType)}
                        />
                    ))}
                </div>
                <div className={styles.container}>
                    {/*<Button onClick={handleSave} title={'Save'}/>*/}
                    {/*<Button title={'Logout'} onClick={cleanUser}/>*/}

                    { appContext.user && appContext.user[0]?._id ?
                        <>
                            <Button onClick={handleSave} type={'default'} title={'Save'}/>
                            <Button title={'Logout'} type={'inverse'} onClick={logout}/>
                        </>
                        :
                        <Button title={'Login'} type={'default'} onClick={handleLogin} />
                    }

                </div>

                <Toolbar initialTab={0} onTabClick={handleToolbarClick}/>
            </div>
        </>
    );
};