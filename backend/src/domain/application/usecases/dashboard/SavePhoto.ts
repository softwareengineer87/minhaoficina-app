import { cloudinary } from "../../../../infra/cloudnaryConfig";
import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";
import { MyFile } from "../../../../utils/utils";
import { Photo } from "../../../entities/Photo";

class SavePhoto {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(launchId: string, url: string): Promise<Output> {
    const photo = Photo.create(launchId, url);
    await this.launchRepository.savePhoto(photo.photoId, photo.launchId, photo.url);

    return {
      photoId: photo.photoId
    }
  }

  convertPhotos(photos: MyFile[]) {
    const photoNames = [];
    for (const photo of photos) {
      photoNames.push(photo.originalname);
    }
    return photoNames;
  }

}

type Output = {
  photoId: string;
}

export { SavePhoto }

