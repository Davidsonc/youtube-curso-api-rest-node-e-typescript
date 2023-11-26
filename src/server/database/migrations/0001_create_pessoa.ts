import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(Knex: Knex) {
    return Knex.schema
        .createTable(ETableNames.pessoa, (table) => {
            table.bigIncrements('id').primary().index();
            table
                .string('nomeCompleto', 150)
                .checkLength('<=', 150)
                .index()
                .notNullable();

            table.string('nome', 150).checkLength('<=', 150).index();

            table.string('sobrenome', 150).checkLength('<=', 100);

            table
                .string('email', 50)
                .checkLength('<=', 50)
                .unique()
                .notNullable();

            table
                .bigInteger('cidadeId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.cidade)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar pessoas do sistema.');
        })
        .then(() => {
            console.log(`Created table ${ETableNames.pessoa}`);
        });
}
export async function down(Knex: Knex) {
    return Knex.schema.dropTableIfExists(ETableNames.pessoa).then(() => {
        console.log(`Dropped table ${ETableNames.pessoa}`);
    });
}
