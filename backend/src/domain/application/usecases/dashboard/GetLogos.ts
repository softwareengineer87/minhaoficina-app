import { DatabaseConnection } from "../../../../infra/database/PgPromiseAdapter";
import { Photo } from "../../../entities/Photo";

class GetLogos {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(businessId: string): Promise<Photo[]> {
    const logos = await this.connection.query(`SELECT lo.* 
    FROM logos as lo
    JOIN business AS b ON b.business_id = lo.business_id
    WHERE lo.business_id = $1
    `, [businessId]);

    return logos;
  }

}

export { GetLogos }

