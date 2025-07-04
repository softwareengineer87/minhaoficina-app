import { BusinessRepository } from "../../../../infra/repository/LaunchRepository";
import { Business } from "../../../entities/Business";

class CreateLaunch {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(input: Input): Promise<Output> {
    const business = Business.create(
      input.name,
      input.email,
      input.password,
      input.city,
      input.district,
      input.addressNumber,
      input.description,
      input.logo
    );
    const hashPass = await business.password.emcryptPassword(input.password);
    const token = business.generateToken();
    await this.businessRepository.saveBusiness(
      business.businessId, business.name, business.getEmail(),
      hashPass, business.city, business.district,
      business.addressNumber, business.description, business.logo
    );

    return {
      businessId: business.businessId,
      token
    }
  }

}

type Input = {
  name: string;
  email: string;
  password: string;
  city: string;
  district: string;
  addressNumber: number;
  description: string;
  logo: string;
}

type Output = {
  businessId: string;
  token: string;
}

export { CreateLaunch }

