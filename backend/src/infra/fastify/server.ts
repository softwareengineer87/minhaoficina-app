import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';
import { PgPromiseAdapter } from '../database/PgPromiseAdapter';
import { routesCustomer } from './routesCustomer';

const app = Fastify();

app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS']
});

const connection = new PgPromiseAdapter();

app.register(routes, connection);
app.register(routesCustomer, connection);
//pgPromiseAdapter.executeScript('../database/create.sql');
app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`server running on ${address}`);
});

