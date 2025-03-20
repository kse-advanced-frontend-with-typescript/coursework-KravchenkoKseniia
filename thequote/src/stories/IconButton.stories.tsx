import type {Meta, StoryObj} from '@storybook/react';

import {IconButton} from '../Components/IconButton/IconButton';


const meta: Meta<typeof IconButton> = {
    component: IconButton,
    title: 'Example/IconButton',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};