import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.pessoa).count<
        [{ count: number }]
    >('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const pessoasList = [
        'Beatriz, Heloise Aragão, beatrizheloisearagao@edpbr.com.br, Amapá',
        'Amanda, Alícia Antonella Mendes, amanda_alicia_mendes@icloub.com, Guarapari',
        'Levi, Yago Gonçalves, levi.yago.goncalves@jcoronel.com.br, Palmas',
        'Filipe, Oliver Barbosa, filipe_oliver_barbosa@cressem.com.br, Cuiabá',
        'Ian, Arthur Enrico de Paula, ian-depaula71@ig.com, Luziânia',
        'Jorge, Miguel Davi Galvão, jorgemiguelgalvao@prlme.com.br, Manaus',
        'Bruno, Bernardo Giovanni Moreira, bruno_moreira@heinrich.com.br, João Pessoa',
        'Pietra, Nair Rayssa Peixoto, pietra.nair.peixoto@outershoes.com.br, Imperatriz',
        'Isabelle, Marli Maitê Almeida, isabellemarlialmeida@ericsson.com, João Pessoa',
        'Nelson, Henry Lucca Oliveira, nelson_oliveira@dcabr.org.br, Maragogi',
        'Gael, Luís Campos, gaelluiscampos@microlasersp.com.br, Natal',
        'Daiane, Elza Débora Monteiro, daianeelzamonteiro@umbernardo.com.br, Sobral',
        'Teresinha, Daniela Sales, teresinhadanielasales@embraer.com.br, Joinville',
        'Luana, Sarah Costa, luana_sarah_costa@oticascarol.com.br, Araguaína',
        'Fábio, Juan Pedro Santos, fabio.juan.santos@danielvasconcelos.com.br, Rio Rufino',
        'Priscila, Alessandra da Conceição, priscila.alessandra.daconceicao@p4ed.com, Palmas',
        'Ricardo, Gabriel Elias Alves, ricardo.gabriel.alves@senioraereo.com.br, Maricá',
        'Aurora, Caroline Renata Ferreira, aurora_ferreira@flextroniocs.copm.br, Rio Branco',
        'Helena, Maitê da Silva, helena_maite_dasilva@cantinadafazenda.com.br, Teresina',
        'Rafael, Mário Novaes, rafaelmarionovaes@gastrolight.com.br, Belo Horizonte',
        'Débora, Lorena da Rosa, deboralorenadarosa@telecall.com, Patos',
        'Giovanna, Antônia Kamilly Figueiredo, giovannaantoniafigueiredo@yahoo.com .br, Biguaçu',
        'Cláudio, Osvaldo Rodrigues, claudio-rodrigues81@andrediaz.com, Rio de Janeiro',
        'Elias, Antonio César Melo, eliasantoniomelo@transporteveloz.com.br, Araguaína',
        'Kaique, Fábio Araújo, kaique.fabio.araujo@quintadoslagos.com.br, Cuiabá',
        'Stella, Emily Lima, stella-lima87@w3ag.com, Águas Lindas de Goiás',
        'Vicente, Luan Gael Castro, vicente_luan_castro@fabiooliva.com.br, Arapiraca',
        'Ester, Emilly Silveira, ester_emilly_silveira@startingfitness.com.br, Rio Branco',
        'Giovanni, Nathan Martins, giovanni_nathan_martins@anfip.org.br, Curitiba',
        'Fabiana, Laura Sabrina Teixeira, fabiana.laura.teixeira@yhaoo.com.br, São Luís',
    ];

    const peoplesToInsert = pessoasList.map((pessoa) => {
        const match = pessoa.match(/^(.*),\s*(.*),\s*(.*),\s*(.*)$/);

        if (match) {
            const [_, nome, sobrenome, email, cidadeId, nomeCompleto] = match;
            return { nome, sobrenome, email, cidadeId, nomeCompleto };
        }
        throw new Error();
    });

    for (const propriedade in peoplesToInsert) {
        const idAleatorio = await gerarIdAleatorio(knex);
        peoplesToInsert[propriedade].cidadeId = idAleatorio.toString();
        peoplesToInsert[propriedade].nomeCompleto =
            peoplesToInsert[propriedade].nome +
            ' ' +
            peoplesToInsert[propriedade].sobrenome;
    }

    await knex(ETableNames.pessoa).insert(peoplesToInsert);
};

async function gerarIdAleatorio(knex: Knex) {
    const cidades = await knex(ETableNames.cidade).select('id');

    const ids = cidades.map((cidade: { id: BigInteger }) => cidade.id);

    const idAleatorio = ids[Math.floor(Math.random() * ids.length)];

    return idAleatorio;
}
