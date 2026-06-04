import { getDb } from '@/shared/database/db';
import { syncShinzohubTransactionsToDb } from '@/server/shinzohub/sync-transactions';

export async function POST() {
  try {
    const db = getDb();
    const result = await syncShinzohubTransactionsToDb(db);
    return Response.json(result);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to sync Shinzohub transactions:', err);
    }
    return Response.json({ error: 'Failed to sync transactions' }, { status: 500 });
  }
}
