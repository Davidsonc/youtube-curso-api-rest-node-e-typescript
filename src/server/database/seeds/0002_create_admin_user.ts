import { PasswordCrypto } from './../../shared/services/PasswordCrypto';
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.usuario).count<
        [{ count: number }]
    >('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const usuariosList = ['admin, 123456, admin@gmail.com'];

    const usersToInsert = usuariosList.map((usuario) => {
        const match = usuario.match(/^(.*),\s*(.*),\s*(.*)$/);

        if (match) {
            const [_, nome, senha, email] = match;
            const hashadPassword = PasswordCrypto.hashPassword(senha);
            return { nome, hashadPassword, email };
        }
        throw new Error();
    });

    await knex(ETableNames.usuario).insert(usersToInsert);
};
