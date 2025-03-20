import type {Meta, StoryObj} from '@storybook/react';

import {LoginForm} from '../Components/LoginForm/LoginForm';

const meta: Meta<typeof LoginForm> = {
    component: LoginForm,
    title: 'Example/LoginForm',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};