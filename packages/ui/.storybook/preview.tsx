import type { Preview } from '@storybook/nextjs'
import './globals.css';

const preview: Preview = {
  decorators: [
    Story => (
      <main className={`text-foreground`}>
        <Story />
      </main>
    )
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
