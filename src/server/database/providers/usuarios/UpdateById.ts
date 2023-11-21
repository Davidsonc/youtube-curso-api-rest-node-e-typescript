import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';

export const updateById = async (
    id: number,
    usuario: Omit<IUsuario, 'id'>
): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.usuario)
            .update(usuario)
            .where('id', '=', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    }
};
