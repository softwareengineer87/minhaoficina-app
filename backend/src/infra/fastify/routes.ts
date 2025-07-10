import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DatabaseConnection } from "../database/PgPromiseAdapter";
import { Login } from "../../domain/application/usecases/dashboard/Login";
import { GetBusiness } from "../../domain/application/usecases/dashboard/GetBusiness";
import { UpdateBusiness } from "../../domain/application/usecases/dashboard/UpdateBusiness";
import { LaunchRepositoryDatabase } from "../repository/LaunchRepository";
import { Signup } from "../../domain/application/usecases/dashboard/Signup";
import { BusinessDetail } from "../../domain/application/usecases/dashboard/BusinessDetail";
import { CreateLaunch } from "../../domain/application/usecases/dashboard/CreateLaunch";
import { GetAllLaunchs } from "../../domain/application/usecases/dashboard/GetAllLaunchs";
import { GetAllPhotos } from "../../domain/application/usecases/dashboard/GetAllPhotos";

function routes(fastify: FastifyInstance, connection: DatabaseConnection) {

  const launchRepository = new LaunchRepositoryDatabase(connection);
  const signup = new Signup(launchRepository);
  const businessLogin = new Login(launchRepository);
  const getBusiness = new GetBusiness(connection);
  const businessDetail = new BusinessDetail(launchRepository);
  const updateBusiness = new UpdateBusiness(connection);
  const createLaunch = new CreateLaunch(launchRepository);
  const getLaunchs = new GetAllLaunchs(connection);
  const getPhotos = new GetAllPhotos(connection);

  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.code(200).send({ ok: true });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.post('/business', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, email, password, logo
      } = request.body as {
        name: string, email: string, password: string, logo: string
      };
      const inputBusiness = {
        name,
        email,
        password,
        logo
      }
      const { businessId } = await signup.execute(inputBusiness);

      reply.code(200).send({
        businessId,
        message: 'Empresa cadastrada com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.post('/business/login', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, password } = request.body as { email: string, password: string };
      const { token, payload } = await businessLogin.execute(email, password);
      reply.code(200).send({
        token,
        payload,
        message: 'Login efetuado com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/business', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const business = await getBusiness.execute();
      reply.code(200).send(business);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/business/:business_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { business_id } = request.params as { business_id: string };
      const business = await businessDetail.execute(business_id);
      reply.code(200).send(business);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.put('/business/:business_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const {
        name,
        email,
        password,
        city,
        district,
        address_number,
        description,
        logo
      } = request.body as {
        name: string,
        email: string,
        password: string,
        city: string,
        district: string,
        address_number: number,
        description: string,
        logo: string
      }
      const { business_id } = request.params as { business_id: string };
      const addressNumber = address_number;
      const { businessId } = await updateBusiness.execute(
        business_id,
        name,
        email,
        password,
        city,
        district,
        addressNumber,
        description,
        logo
      );

      reply.code(200).send({
        businessId,
        message: 'Empresa atualizada com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });


  fastify.post('/create-launch/:business_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, date, tel,
        cpf, model, kilometer, plate, observation } = request.body as {
          name: string;
          date: string;
          tel: string;
          cpf: string;
          model: string;
          kilometer: number;
          plate: string;
          observation: string;
        };
      const { business_id } = request.params as { business_id: string };
      const inputLaunch = {
        businessId: business_id,
        name,
        date,
        tel,
        cpf,
        model,
        kilometer,
        plate,
        observation,
      }
      const { launchId } = await createLaunch.execute(inputLaunch);
      reply.code(201).send({
        launchId,
        message: 'Lançamento cadastrado com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/launchs/:business_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { business_id } = request.params as { business_id: string };
      const launchs = await getLaunchs.execute(business_id);
      reply.code(200).send(launchs);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/photos/:launch_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { launch_id } = request.params as { launch_id: string };
      const photos = await getPhotos.execute(launch_id);
      reply.code(200).send(photos);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.put('/business/services_update/:service_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const {
        service_title,
        price
      } = request.body as {
        service_title: string, description: string, price: number,
        start_hour: string, end_hour: string, service_date: Date
      };
      const { service_id } = request.params as { service_id: string };
      await updateService.execute(
        service_id,
        service_title,
        price
      );
      reply.code(201).send({
        message: 'Serviço atualizado com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.delete('/business/services_delete/:service_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { service_id } = request.params as { service_id: string };
      await deleteService.execute(service_id);
      reply.code(200).send({
        message: 'Serviço deletado com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/business/services/:business_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { business_id } = request.params as { business_id: string };
      const { limit, offset } = request.query as
        { limit: number, offset: number };
      const business = await getServicesByBusinessId.
        execute(business_id, limit, offset);
      reply.code(200).send(business);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/business/service_detail/:service_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { service_id } = request.params as { service_id: string };
      const service = await serviceDetail.execute(service_id);
      reply.code(200).send(service);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/business/all_services/:business_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { business_id } = request.params as { business_id: string };
      const services = await allServices.execute(business_id);
      reply.code(200).send(services);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });
}

export { routes }


