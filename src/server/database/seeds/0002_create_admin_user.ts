import { Knex } from 'knex';
import { PasswordCrypto } from './../../shared/services/PasswordCrypto';

import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.usuario).count<
        [{ count: number }]
    >('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const usuariosList = ['admin, 123456, admin@gmail.com'];

    const usersToInsert = await usuariosList.map((usuario) => {
        const match = usuario.match(/^(.*),\s*(.*),\s*(.*)$/);

        if (match) {
            const [_, nome, senha, email] = match;
            return { nome, senha, email };
        }
        throw new Error();
    });

    for (let index = 0; index < usersToInsert.length; index++) {
        const element = usersToInsert[index];
        element.senha = await PasswordCrypto.hashPassword(element.senha);
    }

    await knex(ETableNames.usuario).insert(usersToInsert);
};
