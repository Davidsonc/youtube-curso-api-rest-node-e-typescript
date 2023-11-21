import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - UpdateById', () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' });
        cidadeId = resCidade.body;
    });

    it('Atualiza Registro por Id', async () => {
        const res1 = await testServer.post('/pessoas').send({
            nome: 'Antonio',
            sobrenome: 'Carlos de Souza',
            cidadeId: cidadeId,
            email: 'antonioUpdateById@gmail.com',
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Luiz',
                sobrenome: 'Almeida',
                cidadeId: cidadeId,
                email: 'luizUpdateById@gmail.com',
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('tenta atualizar um registro que não existe', async () => {
        const res1 = await testServer.put('/pessoas/9999').send({
            nome: 'Luiz',
            sobrenome: 'Almeida',
            cidadeId: 1,
            email: 'luiz2UpdateById@gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
