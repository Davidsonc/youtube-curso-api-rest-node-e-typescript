import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(Knex: Knex) {
    return Knex.schema
        .createTable(ETableNames.cidade, (table) => {
            table.bigIncrements('id').primary().index();
            table
                .string('nome', 150)
                .checkLength('<=', 150)
                .index()
                .notNullable();

            table.comment('Tabela usada para armazenar cidades do sistema.');
        })
        .then(() => {
            console.log(`Created table ${ETableNames.cidade}`);
        });
}
export async function down(Knex: Knex) {
    return Knex.schema.dropTableIfExists(ETableNames.cidade).then(() => {
        console.log(`Dropped table ${ETableNames.cidade}`);
    });
}
