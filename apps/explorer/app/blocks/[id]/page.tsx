import { Header } from "@/widgets/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { generateMockBlocks } from "@/shared/utils/mock-data"
import Link from "next/link"
import { Cable as Cube, ChevronLeft, ChevronRight, Copy } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/shared/ui/button"

export default async function BlockDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blockNumber = Number(id)

  // Generate mock block data
  const blocks = generateMockBlocks(1, blockNumber)
  const block = blocks[0]

  const formatHash = (hash: string, start = 10, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18
    return eth.toFixed(6)
  }

  const CopyButton = ({ text }: { text: string }) => (
    <Button variant="ghost" size="icon" className="h-6 w-6">
      <Copy className="h-3 w-3" />
    </Button>
  )

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-12">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-secondary">
            <Cube className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Block #{block.number}</h1>
            <p className="text-muted-foreground">
              {formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-8">
            <CardTitle>Block Details</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Block Height</span>
                <div className="flex items-center gap-3">
                  <Link href={`/blocks/${block.number - 1}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <span className="font-mono text-sm text-foreground">{block.number}</span>
                  <Link href={`/blocks/${block.number + 1}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Timestamp</span>
                <span className="text-sm text-foreground">{new Date(block.timestamp).toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Transactions</span>
                <Link href={`/transactions?block=${block.number}`} className="text-sm text-background-secondary hover:underline">
                  {block.transactionCount} transactions
                </Link>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Miner</span>
                <div className="flex items-center gap-2">
                  <Link href={`/address/${block.miner}`} className="font-mono text-sm text-background-secondary hover:underline">
                    {formatHash(block.miner)}
                  </Link>
                  <CopyButton text={block.miner} />
                </div>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Block Reward</span>
                <span className="text-sm text-foreground">{(Math.random() * 0.05 + 0.01).toFixed(4)} ETH</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Difficulty</span>
                <span className="font-mono text-sm text-foreground">{block.difficulty}</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Total Difficulty</span>
                <span className="font-mono text-sm text-foreground">{block.totalDifficulty}</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="text-sm text-foreground">{(Number(block.size) / 1024).toFixed(2)} KB</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Gas Used</span>
                <span className="text-sm text-foreground">
                  {(Number(block.gasUsed) / 1e6).toFixed(2)}M (
                  {((Number(block.gasUsed) / Number(block.gasLimit)) * 100).toFixed(2)}%)
                </span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Gas Limit</span>
                <span className="text-sm text-foreground">{(Number(block.gasLimit) / 1e6).toFixed(2)}M</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Base Fee Per Gas</span>
                <span className="text-sm text-foreground">{block.baseFeePerGas} Gwei</span>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Hash</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-foreground">{formatHash(block.hash, 16, 12)}</span>
                  <CopyButton text={block.hash} />
                </div>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Parent Hash</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blocks/${block.number - 1}`}
                    className="font-mono text-sm text-background-secondary hover:underline"
                  >
                    {formatHash(block.parentHash, 16, 12)}
                  </Link>
                  <CopyButton text={block.parentHash} />
                </div>
              </div>

              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">State Root</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-foreground">{formatHash(block.stateRoot, 16, 12)}</span>
                  <CopyButton text={block.stateRoot} />
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Nonce</span>
                <span className="font-mono text-sm text-foreground">{block.nonce}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
