import type { Preview } from '@storybook/nextjs'
import '../app/globals.css';

const preview: Preview = {
  decorators: [
    Story => (
      <main className={`text-text-primary`}>
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
