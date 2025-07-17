import { join } from 'node:path';
import pgp from 'pg-promise';

interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

class PgPromiseAdapter implements DatabaseConnection {

  connection: any;

  constructor() {
    this.connection = pgp()('postgressql://postgres:webdesign@localhost:5433/minhaoficina_db');
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

