import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../database/models/Pessoa';

interface IbodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IbodyProps>(
        yup.object().shape({
            cidadeId: yup.number().integer().required(),
            nomeCompleto: yup.string().required().min(3),
            sobrenome: yup.string().optional().min(3),
            email: yup.string().email().required(),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IbodyProps>,
    res: Response
) => {
    const result = await PessoasProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
