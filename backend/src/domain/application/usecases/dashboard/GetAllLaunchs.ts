import { DatabaseConnection } from "../../../../infra/database/PgPromiseAdapter";
import { Launch } from "../../../entities/Launch";

class GetAllLaunchs {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(businessId: string): Promise<Launch[]> {
    const launchs = await this.connection.query(`SELECT l.*, 
    b.name as business_name FROM launchs as l
    JOIN business AS b ON l.business_id = b.business_id
    WHERE b.business_id = $1
    `, [businessId]);

    return launchs;
  }

}

export { GetAllLaunchs }

