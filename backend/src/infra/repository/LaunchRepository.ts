import { Business } from "../../domain/entities/Business";
import { Launch } from "../../domain/entities/Launch";
import { Part } from "../../domain/entities/Part";
import { Service } from "../../domain/entities/Service";
import { DatabaseConnection } from "../database/PgPromiseAdapter";

interface LaunchRepository {
  saveBusiness(
    businessId: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void>;
  getByEmail(email: string): Promise<Business | null>;
  saveLaunch(launch: Launch): Promise<void>;
  businessDetail(businessId: string): Promise<Business>;
  savePhoto(photoId: string, launchId: string, url: string): Promise<void>;
  saveLogo(photoId: string, businessId: string, url: string): Promise<void>;
  savePart(part: Part): Promise<void>;
}

class LaunchRepositoryDatabase implements LaunchRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async saveBusiness(
    businessId: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.connection.query(`INSERT INTO business
    (business_id, name, email, password) 
    VALUES($1, $2, $3, $4)`, [
      businessId, name, email, password
    ]);
  }

  async getByEmail(email: string): Promise<Business | null> {
    const [businessData] = await this.connection.query(`SELECT * FROM business 
    WHERE email = $1`, [email]);
    if (businessData) {
      return new Business(businessData.business_id, businessData.name,
        businessData.email, businessData.password);
    }

    return null;
  }

  async saveLaunch(launch: Launch): Promise<void> {
    await this.connection.query(`INSERT INTO launchs 
    (launch_id, business_id, name, date, tel, cpf, model,
    kilometer, plate, observation) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [launch.launchId,
    launch.businessId, launch.name, launch.date, launch.tel,
    launch.cpf, launch.model, launch.kilometer, launch.plate,
    launch.observation]);
  }

  async serviceDetail(serviceId: string): Promise<Service> {
    const [serviceData] = await this.connection.query(`SELECT * FROM services 
    WHERE service_id = $1`, [serviceId]);
    return new Service(serviceData.service_id, serviceData.business_id,
      serviceData.service_title, serviceData.price,
    );
  }

  async businessDetail(businessId: string): Promise<Business> {
    const [businessData] = await this.connection.query(`SELECT * FROM business
    WHERE business_id = $1`, [businessId]);

    return new Business(businessData.business_id, businessData.name,
      businessData.email, businessData.password);
  }

  async savePhoto(photoId: string, launchId: string, url: string): Promise<void> {
    await this.connection.query(`INSERT INTO photos
    (photo_id, launch_id, url) VALUES ($1, $2, $3)`, [photoId, launchId, url]);
  }

  async saveLogo(photoId: string, businessId: string, url: string): Promise<void> {
    await this.connection.query(`INSERT INTO logos
    (photo_id, business_id, url) VALUES ($1, $2, $3)`, [photoId, businessId, url]);
  }

  async savePart(part: Part): Promise<void> {
    await this.connection.query(`INSERT INTO parts 
    (part_id, launch_id, name, price) 
    VALUES ($1, $2, $3, $4)`, [part.partId, part.launchId,
    part.name, part.price]);
  }

}

export {
  LaunchRepository,
  LaunchRepositoryDatabase
}

