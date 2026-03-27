CREATE TABLE IF NOT EXISTS validator_details (
    validator_id INTEGER PRIMARY KEY AUTOINCREMENT,
    validator_address TEXT NOT NULL,
    validator_name TEXT,
    validator_public_ip TEXT NOT NULL,
    validator_discord_handle TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
