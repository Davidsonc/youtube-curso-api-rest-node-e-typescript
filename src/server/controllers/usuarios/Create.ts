import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models/Usuario';

interface IbodyProps extends Omit<IUsuario, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IbodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3),
            senha: yup.string().required().min(3),
            email: yup.string().required().email(),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IbodyProps>,
    res: Response
) => {
    const result = await UsuariosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};