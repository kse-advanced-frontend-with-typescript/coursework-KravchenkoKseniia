import type {Meta, StoryObj} from '@storybook/react';

import {SmallQuote} from '../Components/SmallQuote/SmallQuote';

const meta: Meta<typeof SmallQuote> = {
    component: SmallQuote,
    title: 'Example/SmallQuote',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};