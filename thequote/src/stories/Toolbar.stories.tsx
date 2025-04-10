import type {Meta, StoryObj} from '@storybook/react';

import {Toolbar} from '../Components/Toolbar/Toolbar';


const meta: Meta<typeof Toolbar> = {
    component: Toolbar,
    title: 'Example/Toolbar',
    tags: ['autodocs'],
    args: {
        initialTab: 3
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};