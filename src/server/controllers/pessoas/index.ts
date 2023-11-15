import * as DeleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as create from './Create';
import * as getAll from './GetAll';

export const PessoasController = {
    ...DeleteById,
    ...updateById,
    ...getById,
    ...create,
    ...getAll,
};
