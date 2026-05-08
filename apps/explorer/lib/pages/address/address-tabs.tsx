"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import { Typography } from "@/shared/ui/typography";
import { Container } from "@/widgets/layout";

export const AddressTabs = () => {
  return (
    <Tabs defaultValue='overview'>
      <Container
        wrapperClassName='mt-12 border-b border-ui-border'
        className='[&>*]:translate-y-[1px]'
      >
        <TabsList>
          <TabsTrigger value='overview'>
            Overview
          </TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          <Container className='py-10'>
            <Typography variant='md' className='text-muted-foreground'>
              Address overview isn’t available yet, we’re still building it.
            </Typography>
          </Container>
        </TabsContent>
      </div>
    </Tabs>
  );
};
