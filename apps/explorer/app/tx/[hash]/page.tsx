import { Header } from "@/widgets/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { generateMockTransactions, generateMockLogs } from "@/shared/utils/mock-data"
import Link from "next/link"
import { Copy, CheckCircle2, XCircle, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"

export default async function TransactionDetailPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params

  // Generate mock transaction data
  const transactions = generateMockTransactions(1)
  const tx = { ...transactions[0], hash }
  const logs = generateMockLogs(hash)

  const formatHash = (hash: string, start = 10, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18
    return eth.toFixed(6)
  }

  const formatGasPrice = (gasPrice: string) => {
    const gwei = Number(gasPrice) / 1e9
    return gwei.toFixed(2)
  }

  const CopyButton = ({ text }: { text: string }) => (
    <Button variant="ghost" size="icon" className="h-6 w-6">
      <Copy className="h-3 w-3" />
    </Button>
  )

  const transactionFee = (Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
            <FileText className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Details</h1>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">{formatHash(tx.hash, 16, 12)}</span>
              {tx.status ? (
                <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Success
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500">
                  <XCircle className="mr-1 h-3 w-3" />
                  Failed
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Transaction Hash</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">{formatHash(tx.hash, 16, 12)}</span>
                      <CopyButton text={tx.hash} />
                    </div>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {tx.status ? (
                      <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Success
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500">
                        <XCircle className="mr-1 h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Block</span>
                    <Link href={`/blocks/${tx.blockNumber}`} className="text-sm text-accent hover:underline">
                      {tx.blockNumber}
                    </Link>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Timestamp</span>
                    <span className="text-sm text-foreground">
                      {formatDistanceToNow(new Date(Date.now() - Math.random() * 300000), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">From</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/address/${tx.from}`} className="font-mono text-sm text-accent hover:underline">
                        {formatHash(tx.from)}
                      </Link>
                      <CopyButton text={tx.from} />
                    </div>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">To</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/address/${tx.to}`} className="font-mono text-sm text-accent hover:underline">
                        {formatHash(tx.to)}
                      </Link>
                      <CopyButton text={tx.to} />
                    </div>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Value</span>
                    <span className="text-sm font-medium text-foreground">{formatValue(tx.value)} ETH</span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Transaction Fee</span>
                    <span className="text-sm text-foreground">{transactionFee.toFixed(8)} ETH</span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Gas Price</span>
                    <span className="text-sm text-foreground">{formatGasPrice(tx.gasPrice)} Gwei</span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Gas Limit</span>
                    <span className="font-mono text-sm text-foreground">{tx.gas}</span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Gas Used</span>
                    <span className="font-mono text-sm text-foreground">
                      {tx.gasUsed} ({((Number(tx.gasUsed) / Number(tx.gas)) * 100).toFixed(2)}%)
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Nonce</span>
                    <span className="font-mono text-sm text-foreground">{tx.nonce}</span>
                  </div>

                  <div className="flex justify-between border-b border-light pb-3">
                    <span className="text-sm text-muted-foreground">Position in Block</span>
                    <span className="text-sm text-foreground">{tx.transactionIndex}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Input Data</span>
                    <span className="font-mono text-sm text-muted-foreground">{tx.input}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Transaction Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant="outline">Type {tx.type}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Chain ID</span>
                  <span className="font-medium text-foreground">{tx.chainId}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Block Hash</span>
                  <Link href={`/blocks/${tx.blockNumber}`} className="font-mono text-xs text-accent hover:underline">
                    {formatHash(tx.blockHash, 8, 6)}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gas Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Fee</span>
                  <span className="font-medium text-foreground">{formatGasPrice(tx.maxFeePerGas)} Gwei</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Priority</span>
                  <span className="font-medium text-foreground">{formatGasPrice(tx.maxPriorityFeePerGas)} Gwei</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Effective Price</span>
                  <span className="font-medium text-foreground">{formatGasPrice(tx.effectiveGasPrice)} Gwei</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background-secondary/30">
              <CardHeader>
                <CardTitle className="text-base">Transaction Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{transactionFee.toFixed(8)} ETH</div>
                <p className="mt-1 text-xs text-muted-foreground">≈ ${(transactionFee * 3500).toFixed(2)} USD</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
