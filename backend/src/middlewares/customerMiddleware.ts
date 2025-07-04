import { FastifyReply, FastifyRequest } from "fastify";

function customerMiddleware(request: FastifyRequest, reply: FastifyReply, next: any) {
  const bearerToken = request.headers.authorization;
  const token = bearerToken?.split(' ')[1];

  if (!token) {
    throw new Error('Você precisa estar logado para ter acesso as funcionalidades.');
  }

  next();
}

export { customerMiddleware }

