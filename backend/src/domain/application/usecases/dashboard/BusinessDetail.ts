import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";

class BusinessDetail {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(businessId: string): Promise<Output> {
    const business = await this.launchRepository.businessDetail(businessId);
    return {
      businessId: business.businessId,
      name: business.name,
      email: business.getEmail(),
      password: business.password.getValue(),
      city: business.city,
      district: business.district,
      addressNumber: business.addressNumber,
      logo: business.logo
    }
  }

}

type Output = {
  businessId: string;
  name: string;
  email: string;
  password: string;
  city: string;
  district: string;
  addressNumber: number;
  logo: string;
}

export { BusinessDetail }

