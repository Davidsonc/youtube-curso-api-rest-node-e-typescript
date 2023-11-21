import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(Knex: Knex) {
    return Knex.schema
        .createTable(ETableNames.usuario, (table) => {
            table.bigIncrements('id').primary().index();
            table
                .string('nome', 150)
                .checkLength('>', 3)
                .checkLength('<=', 150)
                .unique()
                .notNullable();

            table.string('senha', 6).checkLength('>=', 6).notNullable();

            table
                .string('email', 50)
                .index()
                .checkLength('>=', 6)
                .unique()
                .notNullable();

            table.comment('Tabela usada para armazenar usuários do sistema.');
        })
        .then(() => {
            console.log(`Created table ${ETableNames.usuario}`);
        });
}
export async function down(Knex: Knex) {
    return Knex.schema.dropTableIfExists(ETableNames.usuario).then(() => {
        console.log(`Dropped table ${ETableNames.usuario}`);
    });
}
