import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";
import { Logo } from "../../../entities/Logo";

class SaveLogo {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(businessId: string, url: string): Promise<Output> {
    const photo = Logo.create(businessId, url);
    await this.launchRepository.saveLogo(photo.photoId, photo.businessId, photo.url);

    return {
      photoId: photo.photoId
    }
  }

}

type Output = {
  photoId: string;
}

export { SaveLogo }

