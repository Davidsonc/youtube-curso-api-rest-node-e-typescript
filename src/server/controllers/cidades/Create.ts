import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models/Cidade';
import { CidadesProvider } from '../../database/providers/cidades';

interface IbodyProps extends Omit<ICidade, 'id'> {}
export const createValidation = validation((getSchema) => ({
    body: getSchema<IbodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3).max(150),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IbodyProps>,
    res: Response
) => {
    const result = await CidadesProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
