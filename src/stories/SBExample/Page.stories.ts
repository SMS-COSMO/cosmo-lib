import type { Meta, StoryObj } from '@storybook/vue3';

import MyPage from './PageTemplate.vue';

const meta = {
  title: 'Example/Page',
  component: MyPage,
  render: () => ({
    components: { MyPage },
    template: '<my-page />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof MyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // 交互测试代码

  },
};

export const LoggedOut: Story = {};
