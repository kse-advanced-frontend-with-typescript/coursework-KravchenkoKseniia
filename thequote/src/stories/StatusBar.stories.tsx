import type {Meta, StoryObj} from '@storybook/react';

import {StatusBar} from '../Components/StatusBar/StatusBar';

const meta: Meta<typeof StatusBar> = {
    component: StatusBar,
    title: 'Example/StatusBar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};