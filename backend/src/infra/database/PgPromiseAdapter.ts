import { join } from 'node:path';
import pgp from 'pg-promise';

interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

class PgPromiseAdapter implements DatabaseConnection {

  connection: any;

  constructor() {
    const host = process.env.POSTGRES_HOST || 'localhost';
    const user = process.env.POSTGRES_USER || 'postgres';
    const password = process.env.POSTGRES_PASSWORD || 'webdesign';
    const database = process.env.POSTGRES_DB || 'minhaoficina_db';
    const port = process.env.POSTGRES_PORT || '5432';

    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    this.connection = pgp()(connectionString);
  }

  async query(statement: string, params: any) {
    return await this.connection.query(statement, params);
  }

  async executeScript(script: string) {
    const pgPromise = pgp();
    const filePath = join(script);
    const query = new pgPromise.QueryFile(filePath);
    return await this.connection.query(query);
  }

  async close() {
    return await this.connection.$pool.end();
  }

}

export {
  PgPromiseAdapter,
  DatabaseConnection
}

