import type {Meta, StoryObj} from '@storybook/react';

import {Display} from '../Components/Display/Display';

const meta: Meta<typeof Display> = {
    component: Display,
    title: 'Example/Display',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};