import { BusinessRepository } from "../../../../infra/repository/LaunchRepository";
import { Service } from "../../../entities/Service";

class CreateService {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(input: Input): Promise<Output> {
    const service = Service.create(
      input.businessId,
      input.serviceTitle,
      input.price,
    )
    await this.businessRepository.saveService(service);

    return {
      serviceId: service.serviceId
    }
  }

}

type Input = {
  businessId: string;
  serviceTitle: string;
  price: number;
}

type Output = {
  serviceId: string;
}

export { CreateService }

