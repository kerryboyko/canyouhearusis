import * as language from './language';
import * as currency from './currency';
import { push } from 'react-router-redux';

export default Object.assign({}, language, currency, {push});
