import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' });
        cidadeId = resCidade.body;
    });

    it('Cria Registro', async () => {
        const res1 = await testServer.post('/pessoas').send({
            nome: 'Antonio',
            sobrenome: 'Carlos de Souza',
            cidadeId: cidadeId,
            email: 'antonio@gmail.com',
        });

        expect(res1.status).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('tenta criar um registro com um nome muito curto', async () => {
        const res1 = await testServer.post('/pessoas').send({ nome: 'Ca' });

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});
