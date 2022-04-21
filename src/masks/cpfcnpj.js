import StringMask from 'string-mask';
import masker from '../masker';
import { filterNumbers } from '../helpers';

const handlers = {
  get br() {
    const cpf = new StringMask('000.000.000-00');
    const cnpj = new StringMask('00.000.000/0000-00');

    return (value) => {
      console.log('length', value.length)
      if (value.length <= 11) return cpf.apply(value)
      else return cnpj.apply(value)
    }
  }
}

export default masker(({ locale }) => {
  const handler = handlers[locale || 'br']

  return {
    pre: filterNumbers,
    handler
  }
})
