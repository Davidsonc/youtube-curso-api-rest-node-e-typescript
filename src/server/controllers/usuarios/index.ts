import * as signIn from './SignIn';
import * as signUp from './SignUp';

import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as create from './Create';

export const UsuariosController = {
    ...signIn,
    ...signUp,

    ...deleteById,
    ...updateById,
    ...getById,
    ...create,
};
