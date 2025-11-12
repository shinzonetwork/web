'use client';

import { Header } from "@/widgets/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import Link from "next/link"
import { Cable as Cube } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { usePage, Pagination } from "@/shared/ui/pagination"
import { useBlocks } from '@/entities/block';

export default function BlocksPage() {
  const { page, offset, limit } = usePage();
  const { data: blocks } = useBlocks({ limit, offset });

  const formatHash = (hash: string, start = 10, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  const formatGasUsed = (gasUsed: string, gasLimit: string) => {
    const used = Number(gasUsed)
    const limit = Number(gasLimit)
    const percentage = ((used / limit) * 100).toFixed(2)
    return `${(used / 1e6).toFixed(2)}M (${percentage}%)`
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Blocks</h1>
          <p className="text-muted-foreground">Latest blocks on the blockchain</p>
        </div>

        <Card>
          <CardHeader className="pb-8">
            <div className="flex items-center justify-between">
              <CardTitle>Block List</CardTitle>

              <Pagination page={page} totalItems={blocks?.totalCount ?? 0} />
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                <tr className="border-b border-light">
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Block</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Age</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Txn</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Miner</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Gas Used</th>
                  <th className="pb-4 text-right text-sm font-medium text-muted-foreground">Reward</th>
                </tr>
                </thead>
                <tbody>
                {(blocks?.blocks ?? []).map((block) => (
                  <tr key={block.hash} className="border-b border-light last:border-0">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-secondary">
                          <Cube className="h-5 w-5 text-foreground" />
                        </div>
                        <Link
                          href={`/blocks/${block.number}`}
                          className="font-mono text-sm font-medium text-foreground hover:underline"
                        >
                          {block.number}
                        </Link>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(Number(block.timestamp) * 1000), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        {block.txCount ?? 0}
                        <span className="text-muted-foreground">txns</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <Link
                        href={`/address/${block.miner}`}
                        className="font-mono text-sm text-background-secondary hover:underline"
                      >
                        {formatHash(block.miner, 8, 6)}
                      </Link>
                    </td>
                    <td className="py-5 text-sm text-foreground">{formatGasUsed(block.gasUsed, block.gasLimit)}</td>
                    <td className="py-5 text-right text-sm text-foreground">
                      {(Math.random() * 0.05 + 0.01).toFixed(4)} ETH
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
