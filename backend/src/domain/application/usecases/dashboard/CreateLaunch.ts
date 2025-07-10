import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";
import { Launch } from "../../../entities/Launch";

class CreateLaunch {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(input: Input): Promise<Output> {
    const launch = Launch.create(
      input.businessId,
      input.name,
      input.date,
      input.tel,
      input.cpf,
      input.model,
      input.kilometer,
      input.plate,
      input.observation,
    );

    await this.launchRepository.saveLaunch(launch);

    return {
      launchId: launch.launchId
    }
  }

}

type Input = {
  businessId: string;
  name: string;
  date: string;
  tel: string;
  cpf: string;
  model: string;
  kilometer: number;
  plate: string;
  observation: string;
}

type Output = {
  launchId: string;
}

export { CreateLaunch }

