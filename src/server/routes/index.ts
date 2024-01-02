import { Router } from 'express';

import { CidadesController } from './../controllers';
import { PessoasController } from './../controllers';
import { UsuariosController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
    return res.send('artur');
});

router.get(
    '/cidades',
    CidadesController.getAllValidation,
    CidadesController.getAll
);
router.post(
    '/cidades',
    ensureAuthenticated,
    CidadesController.createValidation,
    CidadesController.create
);
router.get(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.getByIdValidation,
    CidadesController.getById
);
router.put(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.updateByIdValidation,
    CidadesController.updateById
);
router.delete(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.deleteByIdValidation,
    CidadesController.deleteById
);

router.get(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.getAllValidation,
    PessoasController.getAll
);
router.post(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.createValidation,
    PessoasController.create
);
router.get(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.getByIdValidation,
    PessoasController.getById
);
router.put(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.updateByIdValidation,
    PessoasController.updateById
);
router.delete(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.deleteByIdValidation,
    PessoasController.deleteById
);

router.post(
    '/usuarios',
    ensureAuthenticated,
    UsuariosController.createValidation,
    UsuariosController.create
);
router.get(
    '/usuarios/:id',
    ensureAuthenticated,
    UsuariosController.getByIdValidation,
    UsuariosController.getById
);
router.put(
    '/usuarios/:id',
    ensureAuthenticated,
    UsuariosController.updateByIdValidation,
    UsuariosController.updateById
);
router.delete(
    '/usuarios/:id',
    ensureAuthenticated,
    UsuariosController.deleteByIdValidation,
    UsuariosController.deleteById
);

router.post(
    '/entrar',
    UsuariosController.signInValidation,
    UsuariosController.signIn
);

router.post(
    '/cadastrar',
    UsuariosController.signUpValidation,
    UsuariosController.signUp
);

export { router };
