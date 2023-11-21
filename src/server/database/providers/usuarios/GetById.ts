import { Knex } from '../../knex';
import { IUsuario } from '../../models';
import { ETableNames } from '../../ETableNames';

export const getById = async (id: number): Promise<IUsuario | Error> => {
    try {
        const [result] = await Knex(ETableNames.usuario)
            .select('*')
            .where('id', '=', id);
        //.first();

        if (result) return result;

        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }
};
