import * as create from './Create';
import * as getByEmail from './GetByEmail';

import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as count from './Count';

export const UsuariosProvider = {
    ...create,
    ...getByEmail,

    ...deleteById,
    ...updateById,
    ...getById,
    ...count,
};
