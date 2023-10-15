import request from 'supertest';
//import express, { Request, Response } from 'express';
import app from '../src/index'; // Importa tu aplicación Express

/*const expressApp: express.Application = app;

describe('GET /selectventas', () => {
  it('debería devolver un JSON con el mensaje y datos correctos', async () => {
    const response = await request(expressApp).get('/selectventas');
    expect(response.status).toBe(200); // Asegura que la respuesta tenga un estado HTTP 200

    // Asegura que el cuerpo de la respuesta sea un JSON con el mensaje y datos correctos
    expect(response.body).toEqual({
      message: 'Conexión exitosa',
      data: expect.arrayContaining([
        expect.objectContaining({
          ventas: expect.any(Number), // Comprueba que "ventas" sea un número
        }),
      ]),
    });
  });
});*/

it('esto deberia responde json', done=>{
  request(app)
  .get('/selectventas')
  .set('Accept', 'application/json')
  .expect('Content-Type', 'application/json')
  .expect(200,done);
})
