import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'O campo \'${path}\' é obrigatório',
    notType: 'Formato digitado em \'${path}\' é inválido',
    defined: 'O campo \'${path}\' precisa ter um valor definido',
    oneOf: 'O campo \'${path}\' deve ser um dos seguintes valores: ${values}',
    notOneOf: 'O campo \'${path}\' não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    lowercase: 'O campo \'${path}\' deve estar em maiúsculo',
    uppercase: 'O campo \'${path}\' deve estar em minúsculo',
    url: 'O campo \'${path}\' deve ter um formato de URL válido',
    max: 'O campo \'${path}\' deve ter no máximo ${max} caracteres',
    min: 'O campo \'${path}\' deve ter pelo menos ${min} caracteres',
    email: 'Formato de e-mail digitado em \'${path}\' não é válido',
    length: 'O campo \'${path}\' deve ter exatamente ${length} caracteres',
    uuid: 'Valor digitado em \'${path}\' não confere a um UUID válido',
    trim: 'O campo \'${path}\' não deve conter espaços no início ou no fim.',
    matches: 'O valor do campo \'${path}\' deve corresponder ao padrão: ${regex}',
  },
  number: {
    min: 'O campo \'${path}\' deve ser no mínimo ${min}',
    max: 'O campo \'${path}\' deve ser no máximo ${max}',
    integer: 'O campo \'${path}\' deve ser um número inteiro',
    lessThan: 'O campo \'${path}\' deve ser menor que ${less}',
    moreThan: 'O campo \'${path}\' deve ser maior que ${more}',
    positive: 'O campo \'${path}\' deve ser um número positivo',
    negative: 'O campo \'${path}\' deve ser um número negativo',
  },
  date: {
    min: 'O campo \'${path}\' deve ser maior que a data ${min}',
    max: 'O campo \'${path}\' deve ser menor que a data ${max}',
  },
  array: {
    min: 'O campo \'${path}\' deve ter no mínimo ${min} itens',
    max: 'O campo \'${path}\' deve ter no máximo ${max} itens',
    length: 'O campo \'${path}\' deve conter exatamente ${length} itens',
  },
  object: {
    noUnknown: 'O campo \'${path}\' não deve conter valores desconhecidos',
  }
});