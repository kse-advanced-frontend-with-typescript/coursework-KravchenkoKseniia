import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../Components/Button/Button';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Example/Button',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};