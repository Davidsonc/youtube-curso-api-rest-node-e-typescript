import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - DeleteById', () => {
    it('Apaga Registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({ nome: 'Antonio' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('tenta apagar registro que não existe', async () => {
        const res1 = await testServer.delete('/pessoas/9999').send();
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
