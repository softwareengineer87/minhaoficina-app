import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";
import { Business } from "../../../entities/Business";

class Signup {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(input: Input): Promise<Output> {
    const business = Business.create(
      input.name,
      input.email,
      input.password,
      input.logo
    );
    const hashPass = await business.password.emcryptPassword(input.password);
    await this.launchRepository.saveBusiness(
      business.businessId,
      business.name,
      business.getEmail(),
      hashPass,
      business.logo
    );

    return {
      businessId: business.businessId
    }
  }

}

type Input = {
  name: string;
  email: string;
  password: string;
  logo: string;
}

type Output = {
  businessId: string;
}

export { Signup }

