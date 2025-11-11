import { Header } from "@/widgets/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { generateMockBlocks, generateMockTransactions, getMockNetworkStats } from "@/shared/utils/mock-data"
import Link from "next/link"
import { ArrowRight, Clock, Cable as Cube, TrendingUp, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function HomePage() {
  const stats = getMockNetworkStats()
  const latestBlocks = generateMockBlocks(10)
  const latestTransactions = generateMockTransactions(10)

  const formatHash = (hash: string, start = 10, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18
    return eth.toFixed(6)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-12">
        {/* Statistics Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Blocks</CardTitle>
              <Cube className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalBlocks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Avg block time: {stats.avgBlockTime}s</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{(stats.totalTransactions / 1e9).toFixed(2)}B</div>
              <p className="text-xs text-muted-foreground">Across all blocks</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Gas Price</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.avgGasPrice} Gwei</div>
              <p className="text-xs text-muted-foreground">Last 100 blocks</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Network Hash Rate</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.networkHashRate}</div>
              <p className="text-xs text-muted-foreground">Current rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Latest Blocks and Transactions */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Latest Blocks */}
          <Card className="bg-card">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Latest Blocks</CardTitle>
                <Link href="/blocks" className="flex items-center gap-1 text-sm text-secondary hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                {latestBlocks.map((block) => (
                  <div
                    key={block.hash}
                    className="flex items-start justify-between border-b border-border pb-6 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-secondary">
                          <Cube className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <Link
                            href={`/blocks/${block.number}`}
                            className="font-mono text-sm font-medium text-secondary hover:underline"
                          >
                            {block.number}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(block.timestamp), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{block.transactionCount} txns</p>
                      <p className="text-xs text-muted-foreground">Miner: {formatHash(block.miner, 6, 4)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Transactions */}
          <Card className="bg-card">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Latest Transactions</CardTitle>
                <Link href="/tx" className="flex items-center gap-1 text-sm text-secondary hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                {latestTransactions.map((tx) => (
                  <div
                    key={tx.hash}
                    className="flex items-start justify-between border-b border-border pb-6 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <Link
                        href={`/tx/${tx.hash}`}
                        className="block font-mono text-sm font-medium text-secondary hover:underline"
                      >
                        {formatHash(tx.hash)}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>From: {formatHash(tx.from, 6, 4)}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>To: {formatHash(tx.to, 6, 4)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{formatValue(tx.value)} ETH</p>
                      <p className="text-xs text-muted-foreground">Block {tx.blockNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
