import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetAll', () => {
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

    it('Busca todos os Registros', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: 'Antonio',
                sobrenome: 'Carlos de Souza',
                cidadeId: cidadeId,
                email: 'antonioGetAll@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/pessoas/')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});
