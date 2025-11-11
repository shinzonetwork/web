"use client"

import { Header } from "@/widgets/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { generateMockTransactions } from "@/shared/utils/mock-data"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/shared/ui/button"
import { useSearchParams } from "next/navigation"

export default function TransactionsPage() {
  const searchParams = useSearchParams()
  const blockFilter = searchParams.get("block")

  const allTransactions = generateMockTransactions(50)
  const transactions = blockFilter
    ? allTransactions.filter((tx) => tx.blockNumber === Number(blockFilter))
    : allTransactions

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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            {blockFilter ? `Transactions in Block #${blockFilter}` : "Transactions"}
          </h1>
          <p className="text-muted-foreground">
            {blockFilter ? `All transactions in block ${blockFilter}` : "Latest transactions on the blockchain"}
          </p>
        </div>

        <Card>
          <CardHeader className="pb-8">
            <div className="flex items-center justify-between">
              <CardTitle>Transaction List</CardTitle>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <p className="text-sm text-muted-foreground">Page 1 of 10000+</p>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                <tr className="border-b border-light">
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Txn Hash</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Block</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Age</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">From</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground"></th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">To</th>
                  <th className="pb-4 text-right text-sm font-medium text-muted-foreground">Value</th>
                  <th className="pb-4 text-right text-sm font-medium text-muted-foreground">Fee</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.hash} className="border-b border-light last:border-0">
                    <td className="py-5">
                      <Link href={`/tx/${tx.hash}`} className="font-mono text-sm text-secondary hover:underline">
                        {formatHash(tx.hash, 12, 8)}
                      </Link>
                    </td>
                    <td className="py-5">
                      <Link href={`/blocks/${tx.blockNumber}`} className="text-sm text-secondary hover:underline">
                        {tx.blockNumber}
                      </Link>
                    </td>
                    <td className="py-5 text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(Date.now() - Math.random() * 300000), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="py-5">
                      <Link href={`/address/${tx.from}`} className="font-mono text-sm text-secondary hover:underline">
                        {formatHash(tx.from, 8, 6)}
                      </Link>
                    </td>
                    <td className="py-5">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="py-5">
                      <Link href={`/address/${tx.to}`} className="font-mono text-sm text-secondary hover:underline">
                        {formatHash(tx.to, 8, 6)}
                      </Link>
                    </td>
                    <td className="py-5 text-right text-sm text-foreground">{formatValue(tx.value)} ETH</td>
                    <td className="py-5 text-right text-sm text-muted-foreground">
                      {formatGasPrice(tx.gasPrice)} Gwei
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
