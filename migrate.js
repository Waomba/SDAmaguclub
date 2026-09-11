import fs from 'fs';
import { pool } from './api/lib/db.js';

async function runMigration() {
  try {
    console.log('Reading your XAMPP SQL export file...');
    const sqlPath = 'C:\\Users\\Dell\\Downloads\\magusdaclub.sql';
    const sqlQueries = fs.readFileSync(sqlPath, 'utf8');
    const reset = process.argv.includes('--reset');

    console.log('Connecting to Aiven MySQL and uploading your tables...');
    const statements = sqlQueries.split(/;\s*$/m);

    if (reset) {
      const tableNames = [...sqlQueries.matchAll(/CREATE TABLE\s+`([^`]+)`/gi)]
        .map((match) => match[1])
        .reverse();

      console.log(`Resetting ${tableNames.length} tables before import...`);
      await pool.query('SET FOREIGN_KEY_CHECKS = 0');
      for (const tableName of tableNames) {
        await pool.query(`DROP TABLE IF EXISTS \`${tableName.replaceAll('`', '``')}\``);
      }
      await pool.query('SET FOREIGN_KEY_CHECKS = 1');
    }

    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }

    console.log('Success! All SQL statements were uploaded to Aiven Cloud.');
  } catch (error) {
    console.error('Migration failed with error:', error);
    if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.error('The database already contains tables. To replace them, run: node migrate.js --reset');
    }
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

runMigration();
