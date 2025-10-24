import TextField from './TextField';
import ControlledTextField from './ControlledTextField';
import { currencyFormatter, currencyParser } from './masks/currency';

const masks = {
  currency: {
    format: currencyFormatter,
    parse: currencyParser,
    prefix: 'R$ ',
  },
};

export { TextField, masks };

export default ControlledTextField;
