import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { JWTService, PasswordCrypto } from '../../shared/services';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models/Usuario';

interface IbodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IbodyProps>(
        yup.object().shape({
            senha: yup.string().required().min(6),
            email: yup.string().required().email().min(6),
        })
    ),
}));

export const signIn = async (
    req: Request<{}, {}, IbodyProps>,
    res: Response
) => {
    const { email, senha } = req.body;

    const rsUsuario = await UsuariosProvider.getByEmail(email);

    if (rsUsuario instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(
        senha,
        rsUsuario.senha
    );

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        });
    } else {
        const accessToken = JWTService.signIn({ uid: rsUsuario.id });
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso',
                },
            });
        }
        return res.status(StatusCodes.OK).json({ accessToken });
    }
};
