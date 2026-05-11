import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

type TabItem = {
  value: string;
  label: string;
  content: string;
};

type ContentTabsDemoProps = {
  defaultValue: string;
  tabs: TabItem[];
};

const ContentTabsDemo = ({ defaultValue, tabs }: ContentTabsDemoProps) => {
  const fallbackValue =
    tabs.find((tab) => tab.value === defaultValue)?.value ?? tabs[0]?.value ?? "";

  return (
    <section className="w-full max-w-3xl">
      <Tabs defaultValue={fallbackValue} className="gap-6">
        <div className="w-full border-b border-ui-border">
          <TabsList className="[&>*]:translate-y-[1px]">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="border border-ui-border bg-ui-bg p-4">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <p className="text-sm leading-relaxed text-ui-text-muted">
                {tab.content}
              </p>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
};

const ExplorerShellDemo = () => (
  <section className="w-full max-w-4xl">
    <Tabs defaultValue="overview" className="gap-6">
      <div className="flex items-end justify-between border-b border-ui-border">
        <TabsList className="[&>*]:translate-y-[1px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <div className="translate-y-[1px] border border-ui-border px-3 py-2 text-sm text-ui-text-muted">
          Pagination / secondary controls sit here
        </div>
      </div>

      <TabsContent value="overview">
        <div className="border border-ui-border bg-ui-bg-accent p-5 text-sm text-ui-text">
          Use a full-width bottom border under the tab row, and let each trigger
          size to its label with the default horizontal padding.
        </div>
      </TabsContent>

      <TabsContent value="transactions">
        <div className="border border-ui-border bg-ui-bg-accent p-5 text-sm text-ui-text">
          Explorer detail pages place the panel content below a separate top border.
        </div>
      </TabsContent>
    </Tabs>
  </section>
);

const SingleFilterDemo = () => (
  <section className="w-full max-w-4xl">
    <div className="flex items-end justify-between border-b border-ui-border">
      <Tabs defaultValue="all">
        <TabsList className="[&>*]:translate-y-[1px]">
          <TabsTrigger value="all" className="min-w-16">
            All
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="translate-y-[1px] border border-ui-border px-3 py-2 text-sm text-ui-text-muted">
        Pagination
      </div>
    </div>
  </section>
);

const meta = {
  title: "Tabs",
  component: ContentTabsDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Shinzo tabs are content-sized triggers with built-in horizontal padding. In app layouts, place them inside a full-width bottom border wrapper so the active tab can overlap that rule cleanly.",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Value of the tab selected initially.",
    },
    tabs: {
      control: "object",
      description: "Collection of tabs with their labels and content.",
    },
  },
} satisfies Meta<typeof ContentTabsDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandardContentTabs: Story = {
  args: {
    defaultValue: "overview",
    tabs: [
      {
        value: "overview",
        label: "Overview",
        content:
          "Summary of the dataset with quick metrics, supporting notes, and the default content area.",
      },
      {
        value: "details",
        label: "Details",
        content:
          "Detailed content can sit below the shared tab row while keeping the tab triggers content-sized.",
      },
      {
        value: "history",
        label: "History",
        content:
          "Historical notes, change logs, or secondary content can live in separate panels without changing the tab shell.",
      },
    ],
  },
};

export const ExplorerSectionHeader: Story = {
  args: {
    defaultValue: "overview",
    tabs: [],
  },
  render: () => <ExplorerShellDemo />,
};

export const SingleFilter: Story = {
  args: {
    defaultValue: "all",
    tabs: [],
  },
  render: () => <SingleFilterDemo />,
};
