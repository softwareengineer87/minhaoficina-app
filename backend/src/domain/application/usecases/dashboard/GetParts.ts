import { DatabaseConnection } from "../../../../infra/database/PgPromiseAdapter";
import { Part } from "../../../entities/Part";

class GetParts {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(launchId: string): Promise<Part[]> {
    const parts = await this.connection.query(`SELECT * FROM parts
    WHERE launch_id = $1`, [launchId]);

    return parts;
  }

}

export { GetParts }

