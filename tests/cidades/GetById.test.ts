import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - GetById', () => {

    it('Busca Registro por Id', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });

    it('tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/cidades/9999')
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
