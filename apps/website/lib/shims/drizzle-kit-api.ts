const err = () => {
  throw new Error('drizzle-kit/api is not available in the Workers runtime — run migrations via the payload CLI')
}

export const generateSQLiteDrizzleJson = err
export const generateSQLiteMigration = err
export const pushSQLiteSchema = err
export const generatePostgresqlDrizzleJson = err
export const generatePostgresqlMigration = err
export const pushPostgresqlSchema = err
