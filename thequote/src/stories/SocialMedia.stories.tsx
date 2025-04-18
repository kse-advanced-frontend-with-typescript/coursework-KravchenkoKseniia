import type {Meta, StoryObj} from '@storybook/react';

import {SocialMedia} from '../Components/SocialMedia/SocialMedia';

const meta: Meta<typeof SocialMedia> = {
    component: SocialMedia,
    title: 'Example/SocialMedia',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};