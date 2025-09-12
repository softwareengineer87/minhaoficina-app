import { DatabaseConnection } from "../../../../infra/database/PgPromiseAdapter";
import { Business } from "../../../entities/Business";

class UpdateBusiness {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(
    business_id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<Output> {
    const business = Business.create(
      name, email, password
    );
    const hashPass = await business.password.emcryptPassword(password);

    await this.connection.query(`UPDATE business SET
    name = $1, email = $2, password = $3
    WHERE business_id = $9`, [business.name, business.getEmail(),
      hashPass, business_id]);

    return {
      businessId: business_id
    }
  }

}

type Output = {
  businessId: string;
}

export { UpdateBusiness }

