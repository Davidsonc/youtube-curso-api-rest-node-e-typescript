import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middleware';
interface IParamProps {
    id?: number;
}
export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id)
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado',
            },
        });

    const result = await PessoasProvider.getById(req.params.id);
    console.log(result);
    if (result instanceof Error) {
        console.log(result.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    if (result.id > 0) {
        return res.status(StatusCodes.OK).json(result);
    }
};
