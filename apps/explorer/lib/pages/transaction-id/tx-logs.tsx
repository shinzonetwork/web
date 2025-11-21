import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';
import { formatHash } from '@/shared/utils/format-hash';

// unused component (yet)
export const TxLogs = () => {
  return (
    <div className="mt-6">
      <Tabs defaultValue="logs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logs">Logs ({logs.length})</TabsTrigger>
          <TabsTrigger value="internal">Internal Txns</TabsTrigger>
        </TabsList>
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <div key={index} className="rounded-lg border border-light bg-background-secondary/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant="secondary">Log #{log.logIndex}</Badge>
                      <span className="text-xs text-muted-foreground">
                                Transaction Index: {log.transactionIndex}
                              </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="w-20 text-muted-foreground">Address:</span>
                        <Link
                          href={`/address/${log.address}`}
                          className="font-mono text-accent hover:underline"
                        >
                          {formatHash(log.address)}
                        </Link>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-20 text-muted-foreground">Topics:</span>
                        <div className="flex-1 space-y-1">
                          {log.topics.map((topic, i) => (
                            <div key={i} className="font-mono text-xs text-foreground">
                              [{i}] {formatHash(topic, 16, 12)}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-20 text-muted-foreground">Data:</span>
                        <span className="flex-1 break-all font-mono text-xs text-foreground">
                                  {formatHash(log.data, 32, 24)}
                                </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="internal">
          <Card>
            <CardContent className="py-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No internal transactions found</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
