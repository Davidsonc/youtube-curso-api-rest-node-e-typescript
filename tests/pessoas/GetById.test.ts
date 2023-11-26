import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetById', () => {
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

    it('Busca Registro por Id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Antonio',
                sobrenome: 'Carlos de Souza',
                cidadeId: cidadeId,
                email: 'antonioGetById@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('sobrenome');
    });

    it('tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/pessoas/9999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
