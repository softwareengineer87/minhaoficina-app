import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import cors from '@fastify/cors';
import { routes } from './routes';
import { PgPromiseAdapter } from '../database/PgPromiseAdapter';
import { routesCustomer } from './routesCustomer';
import { multerConfig } from './multerConfig';
import { LaunchRepositoryDatabase } from '../repository/LaunchRepository';
import { SavePhoto } from '../../domain/application/usecases/dashboard/SavePhoto';
import { cloudinary } from '../cloudnaryConfig';
import { MyFile } from '../../utils/utils';
import dotenv from 'dotenv';
dotenv.config();

const app = Fastify();

app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS']
});

const connection = new PgPromiseAdapter();

app.register(routes, connection);
app.register(routesCustomer, connection);
app.register(fastifyMultipart);
//pgPromiseAdapter.executeScript('../database/create.sql');

const launchRepository = new LaunchRepositoryDatabase(connection);
const savePhoto = new SavePhoto(launchRepository);

app.post('/photos/:launch_id', { preHandler: multerConfig.single('file') },
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const photo = request.file as MyFile;
      console.log(photo);
      const { launch_id } = request.params as { launch_id: string };
      const result = await cloudinary.uploader.upload(photo.path, { folder: 'minha-oficina' }, async (err, result) => {
        if (err) {
          console.log('error cloud', err);
        }
      });
      const { photoId } = await savePhoto.execute(launch_id, result.url);
      reply.code(201).send({
        result,
        photoId,
        message: 'Imagem salva com sucesso!'
      });
    } catch (error) {
      reply.code(500).send(error);
    }
  });
app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`server running on ${address}`);
});

