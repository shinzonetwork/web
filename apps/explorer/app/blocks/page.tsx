'use client';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardTitle } from "@/shared/ui/card"
import { usePage, Pagination, DEFAULT_LIMIT } from "@/shared/ui/pagination"
import { formatHash } from '@/shared/utils/format-hash';
import { useBlocks } from '@/entities/block';
import { PageLayout } from '@/widgets/layout'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableNullableCell,
  TableLoadingBody,
} from '@/shared/ui/table';

export default function BlocksPage() {
  const { page, offset, limit } = usePage();
  const { data: blocks, isLoading } = useBlocks({ limit, offset });

  const formatGasUsed = (gasUsed: string, gasLimit: string) => {
    const used = Number(gasUsed)
    const limit = Number(gasLimit)
    const percentage = ((used / limit) * 100).toFixed(2)
    return `${(used / 1e6).toFixed(2)}M (${percentage}%)`
  };

  return (
    <PageLayout title='Blocks'>
      <section className="container mx-auto py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Blocks</h1>
          <p className="text-muted-foreground">Latest blocks on the blockchain</p>
        </div>

        <Card>
          <div className="flex items-center justify-between px-8">
            <CardTitle>Block List</CardTitle>

            <Pagination page={page} totalItems={blocks?.totalCount ?? 0} />
          </div>

          <CardContent className="px-8 pb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Block</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Txn</TableHead>
                  <TableHead>Miner</TableHead>
                  <TableHead>Gas Used</TableHead>
                  <TableHead>Reward</TableHead>
                </TableRow>
              </TableHeader>

              {isLoading ? (
                <TableLoadingBody columns={6} rows={DEFAULT_LIMIT} />
              ) : (
                <TableBody>
                  {(blocks?.blocks ?? []).map((block) => (
                    <TableRow key={block?.hash} className='h-12'>
                      <TableNullableCell value={block?.number}>
                        {(value) => (
                          <Link
                            href={`/blocks/${value}`}
                            className="font-mono text-sm font-medium text-foreground hover:underline"
                          >
                            {value}
                          </Link>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={block?.timestamp}>
                        {(value) => formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })}
                      </TableNullableCell>

                      <TableNullableCell value={block?.txCount as number | null}>
                        {(value) => (
                          <div className="flex items-center gap-1 text-sm text-foreground">
                            {value}
                            <span className="text-muted-foreground">txns</span>
                          </div>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={block?.miner}>
                        {(value) => (
                          <Link
                            href={`/address/${value}`}
                            className="font-mono text-sm hover:underline"
                          >
                            {formatHash(value, 8, 6)}
                          </Link>
                        )}
                      </TableNullableCell>

                      <TableNullableCell value={[block?.gasUsed, block?.gasLimit]}>
                        {([gasUsed, gasLimit]) => formatGasUsed(gasUsed, gasLimit)}
                      </TableNullableCell>

                      <TableCell>
                        {(Math.random() * 0.05 + 0.01).toFixed(4)} ETH
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </section>
    </PageLayout>
  )
}
