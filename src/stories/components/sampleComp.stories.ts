import type { Meta, StoryObj } from '@storybook/vue3';

import sampleComp from '@/components/sampleComp.vue';
const meta = {
  title: '组件/sampleComp',
  component: sampleComp,
  tags: ['autodocs'],
} satisfies Meta<typeof sampleComp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
