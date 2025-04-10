import type {Meta, StoryObj} from '@storybook/react';

import {BigQuote} from '../Components/BigQuote/BigQuote';

const meta: Meta<typeof BigQuote> = {
    component: BigQuote,
    title: 'Example/BigQuote',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};