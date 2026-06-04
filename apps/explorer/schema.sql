-- Single-row sync cursor (replaces lastScannedBlock in localStorage)
CREATE TABLE IF NOT EXISTS shinzohub_sync_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  last_scanned_block TEXT NOT NULL DEFAULT '-1',
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

INSERT OR IGNORE INTO shinzohub_sync_state (id, last_scanned_block) VALUES (1, '-1');

CREATE TABLE IF NOT EXISTS shinzohub_transactions (
  hash TEXT PRIMARY KEY,
  from_address TEXT NOT NULL,
  to_address TEXT,
  value TEXT NOT NULL,
  gas_price TEXT NOT NULL,
  block_number TEXT NOT NULL,
  timestamp TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_shinzohub_transactions_block
  ON shinzohub_transactions (block_number DESC);
