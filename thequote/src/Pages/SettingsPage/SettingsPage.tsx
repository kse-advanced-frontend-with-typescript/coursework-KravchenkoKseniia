import {Header} from "../../Components/Header/Header";
import {IconButton, IconType} from "../../Components/IconButton/IconButton";
import {SaveButton} from "../../Components/SaveButton/SaveButton";
import {Toolbar} from "../../Components/Toolbar/Toolbar";
import {AppContext} from "../../context";
import React from "react";
import {useNavigate} from 'react-router';
import styles from './styles.module.css';

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

    const [selectedIcons, setSelectedIcons] = React.useState<IconType[]>([]);
    const {setUser, user, userAPI} = React.useContext(AppContext);

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
                <SaveButton onClick={handleSave}/>
                <Toolbar initialTab={0}/>
            </div>
        </>
    )
}