import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Typography } from "@/shared/ui/typography";
import { Container } from "@/widgets/layout";

export const AddressTabs = () => {
    return (
        <Tabs defaultValue='overview'>
          <Container wrapperClassName='mt-12' borderB>
            <TabsList>
              <TabsTrigger value='overview'>
                Overview
              </TabsTrigger>
            </TabsList>
          </Container>
    
          <div className='mt-2 border-t border-border'>
            <TabsContent value='overview'>
                <Container className='py-10'>
                    <Typography variant='md' className="text-muted-foreground">
                        Address overview isn’t available yet, we’re still building it.
                    </Typography>
                </Container>
            </TabsContent>
          </div>
        </Tabs>
      );
};