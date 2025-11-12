"use client"

import { Header } from "@/widgets/header"
import { Card, CardContent, CardTitle } from "@/shared/ui/card"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LIMIT, Pagination, usePage } from '@/shared/ui/pagination';
import { useTransactions } from '@/entities/tx';
import { Table, TableBody, TableHead, TableHeader, TableLoadingBody, TableNullableCell, TableRow } from '@/shared/ui/table';
import { formatHash } from '@/shared/utils/format-hash';

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const blockFilter = Number(searchParams.get('block'));

  const { page, offset, limit } = usePage();
  const { data: transactions, isLoading } = useTransactions({ limit, offset, blockNumber: (isNaN(blockFilter) || blockFilter === 0) ? undefined: blockFilter });

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
          <div className="flex items-center justify-between px-8">
            <CardTitle>Transaction List</CardTitle>

            <Pagination page={page} totalItems={transactions?.totalCount ?? 0} />
          </div>

          <CardContent className="px-8 pb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Fee</TableHead>
                </TableRow>
              </TableHeader>

              {isLoading ? (
                <TableLoadingBody columns={7} rows={DEFAULT_LIMIT} />
              ) : (
                <TableBody>
                  {(transactions?.transactions ?? []).map((tx) => (
                    <TableRow key={tx?.hash} className='h-12'>
                      <TableNullableCell value={tx?.hash}>
                        {(value) => (
                          <Link href={`/tx/${value}`} className="font-mono text-sm text-foreground hover:underline">
                            {formatHash(value, 12, 8)}
                          </Link>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={tx?.blockNumber}>
                        {(value) => (
                          <Link href={`/blocks/${value}`} className="text-sm hover:underline">
                            {value}
                          </Link>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={tx?.timestamp as string}>
                        {(value) => (
                          formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={tx?.from}>
                        {(value) => (
                          <Link href={`/address/${value}`} className="font-mono text-sm hover:underline">
                            {formatHash(value, 8, 6)}
                          </Link>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={tx?.to}>
                        {(value) => (
                          <Link href={`/address/${value}`} className="font-mono text-sm hover:underline">
                            {formatHash(value, 8, 6)}
                          </Link>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={tx?.value}>
                        {(value) => `${formatValue(value)} ETH`}
                      </TableNullableCell>

                      <TableNullableCell value={tx?.gasPrice}>
                        {(value) => `${formatGasPrice(value)} Gwei`}
                      </TableNullableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
