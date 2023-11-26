import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;
    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-cidades@gmail.com';
        await testServer
            .post('/cadastrar') //cadastra usuario
            .send({ nomeCompleto: 'Teste', email, senha: '123456' });
        const signInRes = await testServer
            .post('/entrar')
            .send({ email, senha: '123456' });
        accessToken = signInRes.body.accessToken;
        //.set({ Authorization: `Bearer ${accessToken}` })

        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nomeCompleto: 'Teste' });
        cidadeId = resCidade.body;
    });

    it('Cria Registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Antonio',
                sobrenome: 'Carlos de Souza',
                cidadeId: cidadeId,
                email: 'antonio@gmail.com',
            });

        expect(res1.status).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('tenta criar um registro com um nome muito curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nomeCompleto: 'Ca' });

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});
