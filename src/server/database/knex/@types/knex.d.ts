import { ICidade } from '../../models/Cidade';
import { IPessoa } from '../../models/Pessoa';
import { IUsuario } from '../../models/Usuario';

declare module 'knex/types/table' {
    interface Tables {
        cidade: ICidade;
        pessoa: IPessoa;
        usuario: IUsuario
    }
}
