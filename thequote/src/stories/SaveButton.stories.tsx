import type {Meta, StoryObj} from '@storybook/react';

import {SaveButton} from '../Components/SaveButton/SaveButton';

const meta: Meta<typeof SaveButton> = {
    component: SaveButton,
    title: 'Example/SaveButton',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};