import { ICidade } from '../../models';
import { IPessoa } from '../../models';

declare module 'knex/types/table' {
    interface Tables {
        cidade: ICidade;
        pessoa: IPessoa;
        //usuario: IUsuario
    }
}
