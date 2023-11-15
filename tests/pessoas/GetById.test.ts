import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetById', () => {
    it('Busca Registro por Id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({ nome: 'Antonio' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.get(`/pessoas/${res1.body}`).send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });

    it('tenta buscar registro que não existe', async () => {
        const res1 = await testServer.get('/pessoas/9999').send();
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
