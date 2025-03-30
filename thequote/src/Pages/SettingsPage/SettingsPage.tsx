import {Header} from "../../Components/Header/Header";
import {IconButton, IconType} from "../../Components/IconButton/IconButton";
import {Button} from "../../Components/Button/Button";
import {Toolbar} from "../../Components/Toolbar/Toolbar";
import {AppContext} from "../../context";
import React, {useContext, useState} from "react";
import styles from './styles.module.css';
import {User} from "../../modules/clients/user";
import {useNavigate} from "react-router";

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
]

export const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [context, setContext] = useState<{user?: User}>({ });
    const [selectedIcons, setSelectedIcons] = useState<IconType[]>([]);
    const {setUser, user, userAPI} = useContext(AppContext);

    const handleCLick = (iconType: IconType) => {
        if (selectedIcons.includes(iconType)) {
            setSelectedIcons(selectedIcons.filter(icon => icon !== iconType));
        } else {
            setSelectedIcons([...selectedIcons, iconType]);
        }
    };

    const handleSave =  () => {
        if (user) {
            const updatedUser = {...user, categories: selectedIcons};
            setUser(updatedUser);
            console.log('Saved categories:', selectedIcons);
        }
        else {
            console.log('User not found');
        }

    }

    const cleanUser = () => {
        setContext({
            ...context,
            user: undefined
        });

        userAPI.CleanToken();
        navigate('/login');
    };


    return (
        <>

            <div className={styles.content}>
                <Header title={'SETTINGS'}/>
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
                <Button onClick={handleSave} title={'Save'}/>
                <Button title={'Logout'} onClick={cleanUser}/>
                <Toolbar initialTab={0}/>
            </div>
        </>
    )
}