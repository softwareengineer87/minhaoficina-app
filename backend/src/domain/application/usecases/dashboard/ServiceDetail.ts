import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";
import { Service } from "../../../entities/Service";

class ServiceDetail {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(serviceId: string): Promise<Service> {
    const service = await this.launchRepository.serviceDetail(serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado.');
    }

    return service;
  }

}

export { ServiceDetail }

