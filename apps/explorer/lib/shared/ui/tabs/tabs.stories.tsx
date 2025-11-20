import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

type TabItem = {
  value: string;
  label: string;
  content: string;
};

type TabsDemoProps = {
  defaultValue: string;
  tabs: TabItem[];
};

const TabsDemo = ({ defaultValue, tabs }: TabsDemoProps) => {
  const fallbackValue = tabs.find((tab) => tab.value === defaultValue)?.value ?? tabs[0]?.value ?? '';

  return (
    <section className='w-100'>
      <Tabs defaultValue={fallbackValue}>
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="rounded-lg border border-border bg-background p-4">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <p className="text-sm text-muted-foreground">{tab.content}</p>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
};

const meta = {
  title: 'Tabs',
  component: TabsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Value of the tab that should be selected initially',
    },
    tabs: {
      control: 'object',
      description: 'Collection of tabs with their label and content',
    },
  },
} satisfies Meta<typeof TabsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'overview',
    tabs: [
      {
        value: 'overview',
        label: 'Overview',
        content: 'Summary of the dataset with quick metrics and highlights.',
      },
      {
        value: 'details',
        label: 'Details',
        content: 'Comprehensive description of each field, validation rules, and usage tips.',
      },
      {
        value: 'history',
        label: 'History',
        content: 'Chronological log of updates, deployments, and notable changes.',
      },
    ],
  },
};

