import { DatabaseConnection } from "../../../../infra/database/PgPromiseAdapter";
import { Photo } from "../../../entities/Photo";

class GetAllPhotos {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(launchId: string): Promise<Photo[]> {
    const photos = await this.connection.query(`SELECT ph.* 
    FROM photos as ph
    JOIN launchs AS l ON l.launch_id = ph.launch_id
    WHERE l.launch_id = $1
    `, [launchId]);

    return photos;
  }

}

export { GetAllPhotos }

