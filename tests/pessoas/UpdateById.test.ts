import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - UpdateById', () => {
    it('Atualiza Registro por Id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({ nome: 'Antonio' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({ nome: 'Antonio' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('tenta atualizar um registro que não existe', async () => {
        const res1 = await testServer
            .put('/pessoas/9999')
            .send({ nome: 'Antonio' });
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
